const {
    TokenCreateTransaction,
    Client,
    TokenType,
    TokenMintTransaction,
    AccountBalanceQuery, PrivateKey, Wallet, TokenSupplyType
} = require("@hashgraph/sdk");
require('dotenv').config({path: "../.env"});
// fetch Account1 and set is as treasury account 
//const utils=require("./utils");
const treasuryId = process.env.MY_ACCOUNT_ID;
const treasuryKey =PrivateKey.fromString(process.env.MY_PRIVATE_KEY); 


if (treasuryId == null || treasuryKey == null ) {
    throw new Error("Environment variables treasuryId and treasuryKey must be present");
}

// Create our connection to the Hedera network using treasury account
const client = Client.forTestnet();

client.setOperator(treasuryId, treasuryKey);
//
const adminUser = new Wallet(
    treasuryId,
    treasuryKey
)


async function createFT() {
    //Create the transaction and freeze for manual signing
    const transaction = await new TokenCreateTransaction()
        .setTokenName("Carbon Credit")
        .setTokenSymbol("CC")
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(treasuryId)
        .setInitialSupply(5000)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(6000)
        .setAdminKey(adminUser.publicKey)
        .freezeWith(client);

    //Sign the transaction with the client, who is set as admin and treasury account
    const signTx =  await transaction.sign(treasuryKey);
    
    //Submit to a Hedera network
    const txResponse = await signTx.execute(client);
    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the token ID from the receipt
     tokenId = receipt.tokenId;

    console.log("The new token ID is " + tokenId);

}


async function main(){
    // call createFT func
    createFT();

     
}
main();