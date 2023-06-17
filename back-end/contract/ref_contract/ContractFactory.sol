// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import './EmitterContract.sol';

contract ContractFactory{

    EmitterContract[] public emitter_contract;

     event ContractCreated(address newContract, uint256 timestamp);

    function createContract(address payable _emitter_address, address payable _govt_address,address  _tokenId) public {
        EmitterContract newContract = new EmitterContract(_emitter_address,_govt_address,_tokenId);
        emitter_contract.push(newContract);
        emit ContractCreated(address(newContract), block.timestamp);
    }

    function getDeployedContracts() public view returns (EmitterContract[] memory) {
        return emitter_contract;
    }

}



