// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "../precompiled-contracts-2/HederaTokenService.sol";
import "../precompiled-contracts-2/ExpiryHelper.sol";
import "../precompiled-contracts-2/KeyHelper.sol";


contract TokenCreateContract is HederaTokenService, ExpiryHelper, KeyHelper {

    string name = "Greentech Carbon Token";
    string symbol = "GCT";
    string memo = "greenTech token created";
    int64 initialTotalSupply = 5000;
    int64 maxSupply = 5000;
    int32 decimals = 2;
    bool freezeDefaultStatus = false;


    event CreatedToken(address tokenAddress);
    event AssociateResponse(int responseCode);
    

    function createGreenFungibleToken(
        address treasury,bytes memory adminKey
    ) public payable returns(address){
        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](5);
        keys[0] = getSingleKey(KeyType.ADMIN, KeyType.PAUSE, KeyValueType.INHERIT_ACCOUNT_KEY, adminKey);
        keys[1] = getSingleKey(KeyType.KYC, KeyValueType.INHERIT_ACCOUNT_KEY, adminKey);
        keys[2] = getSingleKey(KeyType.FREEZE, KeyValueType.INHERIT_ACCOUNT_KEY, adminKey);
        keys[3] = getSingleKey(KeyType.WIPE, KeyValueType.INHERIT_ACCOUNT_KEY, adminKey);
        keys[4] = getSingleKey(KeyType.SUPPLY, KeyValueType.INHERIT_ACCOUNT_KEY, adminKey);

        IHederaTokenService.Expiry memory expiry = IHederaTokenService.Expiry(
            0, treasury, 8000000
        );

        IHederaTokenService.HederaToken memory token = IHederaTokenService.HederaToken(
            name, symbol, treasury, memo, true, maxSupply, freezeDefaultStatus, keys, expiry
        );

        (int responseCode, address tokenAddress) =
        HederaTokenService.createFungibleToken(token, initialTotalSupply, decimals);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ("Token creation failed");
        }

        emit CreatedToken(tokenAddress);
        return tokenAddress;
    }

   

    function associateTokenPublic(address account, address token) public returns (int responseCode) {
        responseCode = HederaTokenService.associateToken(account, token);
        emit AssociateResponse(responseCode);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ("Association failed");
        }
    }


   

}