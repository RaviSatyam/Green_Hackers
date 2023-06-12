// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// Compile with remix for remote imports to work - otherwise keep precompiles locally
import "../precompiled-contracts/HederaTokenService.sol";
import "../precompiled-contracts/HederaResponseCodes.sol";

// Fields required for emitter
struct Emitter{
    int64 allowableCC;
    int64 remainingCC;
    int64 paybackCC;
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

            // Call tansferHbar Function to send Hbar from Contract address to Emitter address
        }

    }

    //  Payback Carbon token to govt account address

     function paybackTokenToGovt(int64 amount) public {
        int response = HederaTokenService.transferToken(tokenId,emitter_address, govt_address , amount);
    
        if (response != HederaResponseCodes.SUCCESS) {
            revert ("Transfer Failed");
        }
    }

    //Function to set allowable CC
    // function setAllowableCC(uint _allowableCC) public{


    // }

    // Function to send payback request to Emitter
    function sendPaybackReqToEmitter(int64 _paybackCC)public{
        emitterInfo.paybackCC=(emitterInfo.paybackCC)+_paybackCC;
        
        // Set due date functionality

    }




    //============================================ 
    // CHECKING THE HBAR BALANCE OF THE CONTRACT
    //============================================ 
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}