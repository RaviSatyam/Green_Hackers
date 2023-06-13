// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// Compile with remix for remote imports to work - otherwise keep precompiles locally
// import "../precompiled-contracts/HederaTokenService.sol";
// import "../precompiled-contracts/HederaResponseCodes.sol";
import "../precompiled-contracts-2/HederaTokenService.sol";
import "../precompiled-contracts-2/HederaResponseCodes.sol";


// Fields required for emitter
struct Emitter{
    int64 allowableCC;//300   lockFund=300*2=600Hbar
    int64 remainingCC;//300
    int64 paybackCC;//30
    uint dueDate;
    uint penalty;
}
contract EmitterContract is HederaTokenService{

     // Emitter and Government account address
     address payable public emitter_address;
     address payable public govt_address;
     address public tokenId;

     // To store the emitter info
     Emitter public emitterInfo;

     constructor(address payable _emitter_address,address payable _govt_address,address _tokenId){
        emitter_address=_emitter_address;
        govt_address=_govt_address;
        tokenId=_tokenId;
     }
 
    // Lock Funds to the Contract from the Emitter account
    receive() external payable {}

    fallback() external payable {}


    // Hbar transfer to Emitter account address
    function transferHbar( uint _amount) public {
        emitter_address.transfer(_amount);
    }


    //  Transfer Carbon token to Emitter account address

     function tokenTransferToEmitter(int64 amount) public {
        int response = HederaTokenService.transferToken(tokenId, govt_address,emitter_address , amount);
        
        emitterInfo.allowableCC=amount;
        emitterInfo.remainingCC=amount;
    
        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Transfer Failed");
        }
    }

    // Emitter accept Payback request
    function acceptPaybackRequest(bool accept) public {
        if(accept){
            // Call payback to govt transfer function
            int64 amount=emitterInfo.paybackCC;
            paybackTokenToGovt(amount);
            emitterInfo.paybackCC=0;
            // Call penalty check function (on the basis of due date)
            uint _penalty=penaltyCalculation();


            // Call tansferHbar Function to send Hbar from Contract address to Emitter address
            uint _amount=uint64(emitterInfo.paybackCC)*2*100000000-_penalty;
            transferHbar(_amount);
        }else{
            revert("Emitter does not payback CC");
        }

    }

    //  Payback Carbon token to govt account address

     function paybackTokenToGovt(int64 amount) public {
        int response = HederaTokenService.transferToken(tokenId,emitter_address, govt_address , amount);
    
        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Transfer Failed");
        }
    }

    // function to calculate penalty
    function penaltyCalculation() public view returns(uint penalty){
        // for 1 day= 1 Hbar
        uint _extraTime=block.timestamp-(emitterInfo.dueDate);
        if(_extraTime>0){
            uint _penalty=(_extraTime/(24*3600))*10000000;
            return _penalty;
        }
    }

    

    // Function to send payback request to Emitter
    function sendPaybackReqToEmitter(int64 _paybackCC)public{
        emitterInfo.paybackCC=(emitterInfo.paybackCC)+_paybackCC;
        
        // Set due date functionality // by default due date=10 days
        emitterInfo.dueDate=block.timestamp + (10*24*3600);
         
    }


    // Freeze Emitter account-----> On the basis platform rules
    function freezeEmitterAccount()public{
        int response= HederaTokenService.freezeToken(tokenId, emitter_address);
        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Failed to Freeze token");
        }
    }

    // Unfreeze Emitter account-----> On the basis platform rules
    function unFreezeEmitterAccount()public{
        int response= HederaTokenService.unfreezeToken(tokenId, emitter_address);
        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Failed to Unfreeze token");
        }
    }



// write unfreezeEmitter T&C 

// Where should we call freezeEmitterAccount() function



    //============================================ 
    // CHECKING THE HBAR BALANCE OF THE CONTRACT
    //============================================ 
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}