// Import dependencies
const {
    TransferTransaction, Client, PrivateKey,
    TokenAssociateTransaction, Hbar,
    AccountBalanceQuery, Wallet, AccountInfoQuery,
    TokenDissociateTransaction,
    getTokensForAccount
} = require("@hashgraph/sdk");

require('dotenv').config({ path: '../.env' });
// fetch Account1 and set is as treasury account 
const treasuryId = process.env.MY_ACCOUNT_ID;
const treasuryKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

if (treasuryId == null || treasuryKey == null) {
    throw new Error("Environment variables treasuryId and treasuryKey must be present");
}

// Create our connection to the Hedera network using treasury account
const client = Client.forTestnet();

client.setOperator(treasuryId, treasuryKey);
const tokenId = process.env.TOKEN_ID;

const adminUser = new Wallet(
    treasuryId,
    treasuryKey
)

//Define tokenAssociateWithAccount() function to associate accounts
module.exports.tokenAssociateWithAccount = async function (accountID, pvKey) { // ???????????? how emitter pv key come to associate with FT
    try {
        // Associate account Id with token Id
        let associateOtherWalletTx = await new TokenAssociateTransaction()
            .setAccountId(accountID)
            .setTokenIds([tokenId])
            .freezeWith(client)
            .sign(pvKey);

        //Submit to Hedera network
        let associateOtherWalletTxSubmit = await associateOtherWalletTx.execute(client);

        //Get the receipt of the transaction
        let associateOtherWalletRx = await associateOtherWalletTxSubmit.getReceipt(client);

        console.log(`Token association status ${associateOtherWalletRx.status}`);

        return associateOtherWalletRx.status;
    }
    // Identify errors when the status is unsuccessful
    catch (error) {
        console.info(`Fail to associate account:${error}`);
    }

}

//Define tokenTransferToAccount() function to transfer tokens
module.exports.tokenTransferToAccount = async function (accountID, tokenAmount) {
    try {
        //Create the transfer transaction
        const transaction = await new TransferTransaction()
            .addTokenTransfer(tokenId, client.operatorAccountId, -tokenAmount)
            .addTokenTransfer(tokenId, accountID, tokenAmount)
            .freezeWith(client);
        //Sign with the sender account private key
        const signTx = await transaction.sign(treasuryKey);
        //Sign with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(client);
        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(client);
        //Obtain the transaction consensus status
        const transactionStatus = receipt.status;
        console.log("Transaction status: " + transactionStatus.toString());
        return transactionStatus;
    }
    // Identify errors when the status is unsuccessful
    catch (error) {
        console.info(`Fail to transfer token ${error}`);
    }

}



//Define balaceTokenQuery() functon to examine token balance
module.exports.balanceTokenQuery = async function (accountID) {

    //Create the query
    const balanceQuery = new AccountBalanceQuery()
        .setAccountId(accountID);

    //Sign with the client operator private key and submit to a Hedera network
    const tokenBalance = await balanceQuery.execute(client);

    // console.log(`The token balance of the user be owned by AccountId ${accountID} is: ` + tokenBalance.tokens.get(tokenId));
    return tokenBalance.tokens.get(tokenId);
}

// Hbar Transfer from ACC1 to ACC2
module.exports.transferHbar = async function (senderAccount, receiverAccount) {
    //Create the transfer transaction
    const sendHbar = await new TransferTransaction()
        .addHbarTransfer(senderAccount, Hbar.fromTinybars(-1000)) //Sending account
        .addHbarTransfer(receiverAccount, Hbar.fromTinybars(1000)) //Receiving account
        .execute(client);

    //Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

}

// Check Hbar balance
module.exports.checkHbarBal = async function (accountId) {
    //Check the account's balance
    const getBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);

    console.log("The account balance after the transfer is: " + getBalance.hbars + " hbar.")
}

// Payback function-> transfer FT to govt account
module.exports.paybackToGovtAccount = async function (accountID, tokenAmount, senderPvKey) {
    try {
        //Create the transfer transaction
        const transaction = await new TransferTransaction()
            .addTokenTransfer(tokenId, accountID, -tokenAmount)
            .addTokenTransfer(tokenId, client.operatorAccountId, tokenAmount)
            .freezeWith(client);
        //Sign with the sender account private key
        const signTx = await transaction.sign(senderPvKey);
        //Sign with the client operator private key and submit to a Hedera network
        const txResponse = await signTx.execute(client);
        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(client);
        //Obtain the transaction consensus status
        const transactionStatus = receipt.status;

        return transactionStatus;
    }
    // Identify errors when the status is unsuccessful
    catch (error) {
        console.info(`Fail to transfer token ${error}`);
    }

}

// Freeze Emitter Account
module.exports.freezeEmitterAccount = async function (accountID) {

    
    //Freeze an account from transferring a token
    const transaction = await new TokenFreezeTransaction()
        .setAccountId(accountID)
        .setTokenId(tokenId)
        .freezeWith(client);

    //Sign with the freeze key of the token 
    const signTx = await transaction.sign(freezeKey);

    //Submit the transaction to a Hedera network    
    const txResponse = await signTx.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The freeze account status " + transactionStatus.toString());

    return transactionStatus;

}

// Disassociate account with Token
module.exports.dissociateTokenWithAccount = async function (accountID, accPrivateKey) {
    try {
        // Build the token dissociation transaction
        const transaction = await new TokenDissociateTransaction()
            .setAccountId(accountID)
            .setTokenIds([tokenId])
            .freezeWith(client);

        //Sign with the private key of the account that is being associated to a token 
        const signTx = await transaction.sign(accPrivateKey);

        //Submit the transaction to a Hedera network    
        const txResponse = await signTx.execute(client);

        //Request the receipt of the transaction
        const receipt = await txResponse.getReceipt(client);

        //Get the transaction consensus status
        const transactionStatus = receipt.status;

        console.log("Token dissociate status: " + transactionStatus.toString());

        return transactionStatus;

    } catch (error) {
        console.error("Error occurred during token dissociation:", error);
    }

}

