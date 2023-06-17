// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// Compile with remix for remote imports to work - otherwise keep precompiles locally
// import "../precompiled-contracts/HederaTokenService.sol";
// import "../precompiled-contracts/HederaResponseCodes.sol";
import "../precompiled-contracts-2/HederaTokenService.sol";
import "../precompiled-contracts-2/HederaResponseCodes.sol";

// Fields required for emitter
struct Emitter {
    int64 allowableCC; //300   lockFund=300*2=600Hbar
    int64 remainingCC; //300
    int64 paybackCC; //30
    uint dueDate;
    uint freezeDueDate;
    uint payBackCounter;
    uint penalty;
    uint maxPenalty;
}

contract EmitterContract is HederaTokenService {
    // Emitter and Government account address
    address payable public emitter_address;
    address payable public govt_address;
    address public tokenId;

    // To store the emitter info
    Emitter public emitterInfo;

    constructor(
        address payable _emitter_address,
        address payable _govt_address,
        address _tokenId
    ) {
        emitter_address = _emitter_address;
        govt_address = _govt_address;
        tokenId = _tokenId;
        emitterInfo.payBackCounter=0;
    }

    // Lock Funds to the Contract from the Emitter account
    receive() external payable {}

    fallback() external payable {}



    // Calculate lock fund amount
    function calculateLockFundAmount(
        int64 allowableCC
    ) public  returns (uint lockFund) {
        uint _maxPenalty = 0;
        uint n = uint64(allowableCC / 5);

        for (uint i = 5; i > 0; i--) {
            _maxPenalty = ((60000000) * n * i) + _maxPenalty;
        }
        emitterInfo.maxPenalty=_maxPenalty;
        lockFund = uint64(allowableCC * 500000000) + _maxPenalty;
    }



    // Hbar transfer to Emitter account address
    function transferHbar(uint _amount) public {
        emitter_address.transfer(_amount);
    }



    //  Transfer Carbon token to Emitter account address
    function tokenTransferToEmitter(int64 amount) public {
        int response = HederaTokenService.transferToken(
            tokenId,
            govt_address,
            emitter_address,
            amount
        );

        emitterInfo.allowableCC = amount;
        emitterInfo.remainingCC = amount;

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Transfer Failed");
        }
    }



    // Emitter accept Payback request
    function acceptPaybackRequest(bool accept) public {
        if (accept) {
           
            // Call penalty check function (on the basis of due date)
            uint _penalty;
            uint extraDays;
            (_penalty, extraDays) = penaltyCalculation();
            emitterInfo.penalty=(emitterInfo.penalty)+_penalty;

            // Check condition for freeze
            if (((block.timestamp)>(emitterInfo.freezeDueDate) && emitterInfo.payBackCounter>=5)|| _penalty>emitterInfo.maxPenalty) {
                //  Hbar transfer to emitter 
                uint _amount=(emitterInfo.maxPenalty)-(emitterInfo.penalty);
                 if(_amount>0){
                    transferHbar(_amount);
                 }
                

                // freeze account
                freezeEmitterAccount();

                //transfer all remaining hbar to govt account
                govt_address.transfer(address(this).balance);
            }

            // Call payback to govt transfer function
            int64 amount = emitterInfo.paybackCC;
            paybackTokenToGovt(amount);
            emitterInfo.paybackCC = 0;
            emitterInfo.remainingCC = (emitterInfo.remainingCC) - amount;


        } else {
            revert("Emitter does not payback CC");
        }
    }

    //  Payback Carbon token to govt account address

    function paybackTokenToGovt(int64 amount) public {
        int response = HederaTokenService.transferToken(
            tokenId,
            emitter_address,
            govt_address,
            amount
        );

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Transfer Failed");
        }
    }

    // function to calculate penalty
    function penaltyCalculation()
        public
        view
        returns (uint penalty, uint extraDays)
    {
        // for 1 sec_1 token=10^6
        uint _extraTime = (block.timestamp - (emitterInfo.dueDate)) ;

        uint _penalty = _extraTime * (uint64(emitterInfo.paybackCC))*1000000;
        return (_penalty, _extraTime);
    }


    // Function to send payback request to Emitter
    function sendPaybackReqToEmitter(int64 _paybackCC) public {

        if(emitterInfo.payBackCounter==0){
            emitterInfo.freezeDueDate=block.timestamp+320;
        }
        // set payback value
        emitterInfo.paybackCC = (emitterInfo.paybackCC) + _paybackCC;

        //call penalty calculation function if emitterInfo.paybackCC !=0 
        if(emitterInfo.paybackCC !=0){
            uint extra;
            uint _penalty;
            (_penalty,extra)=penaltyCalculation();
            emitterInfo.penalty=(emitterInfo.penalty)+_penalty;// 30 ->1 min 90 //2nd time 30  next 1min ->90+90
        }

        // Set due date functionality // by default due date=10 days
        emitterInfo.dueDate = block.timestamp + 20;

        emitterInfo.payBackCounter=(emitterInfo.payBackCounter)+1;

        
    }

    // Freeze Emitter account-----> On the basis platform rules
    function freezeEmitterAccount() public {
        int response = HederaTokenService.freezeToken(tokenId, emitter_address);
        if (response != HederaResponseCodes.SUCCESS) {
            revert("Failed to Freeze token");
        }
    }

    // Unfreeze Emitter account-----> On the basis platform rules
    function unFreezeEmitterAccount() public {
        int response = HederaTokenService.unfreezeToken(
            tokenId,
            emitter_address
        );
        if (response != HederaResponseCodes.SUCCESS) {
            revert("Failed to Unfreeze token");
        }
    }

    // write unfreezeEmitter T&C
    function unFreezeEmitterAccountTandC() public {
        //Need to pay extra Hbar-> 50 Hbar
        require(
            getBalance() > 5000000000,
            "Balance of emitter account is not enough to unfreeze"
        );
        govt_address.transfer(5000000000);
        unFreezeEmitterAccount();
    }

    // Where should we call freezeEmitterAccount() function

    //============================================
    // CHECKING THE HBAR BALANCE OF THE CONTRACT
    //============================================
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
