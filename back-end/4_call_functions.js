console.clear();
require("dotenv").config();
const {
    AccountId,
    PrivateKey,
    Client
    
} = require("@hashgraph/sdk");


const utils = require("./utils/contract_utils");
const hederaUtils=require("./utils/hedera_utils");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID); //purchaser
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const contractId = process.env.EMITTER1_CONTRACT_ID;

let contractCompiled = require("./contract/build/contracts/EmitterContract.json");
const abi = contractCompiled.abi;
const bytecode = contractCompiled.bytecode;

// Emitter
const emitterId= AccountId.fromString(process.env.Account1_Id);



async function main() {

    // STEP 1 =====================================
    //Check balance
    console.log("Query balance for emitter account.....")
    await utils.queryBalance(emitterId,client);

    console.log("Query balance for govt account.....")
    await utils.queryBalance(operatorId,client);

    console.log("Query balance for contract account.....")
    await utils.showContractBalanceFcn(contractId,client);

    // STEP 2 =====================================
    //Lock fund to the smart contract for equivalent CC tokens worth

    // Transfer HBAR to the contract using .setPayableAmount WITHOUT specifying a function (fallback/receive triggered)
    let payableAmt = 10;
    let gasLimit=100000;
    console.log(`- Caller (Operator) PAYS ${payableAmt} ℏ to contract (fallback/receive)...`);
    const toContractRx = await utils.contractExecuteNoFcn(contractId, gasLimit, payableAmt,client);
    console.log("Lock fund status:",toContractRx.status.toString());


    // STEP 3 =====================================
    //Check balance
    console.log("Query balance for emitter account.....")
    await utils.queryBalance(emitterId,client);

    console.log("Query balance for govt account.....")
    await utils.queryBalance(operatorId,client);

    console.log("Query balance for contract account.....")
    await utils.showContractBalanceFcn(contractId,client);

     // STEP 4 =====================================
    //check token balance

    console.log("Query token balance for emitter account.....")
    await hederaUtils.balanceTokenQuery(emitterId);
    console.log("Query token balance for govt account.....")
    await hederaUtils.balanceTokenQuery(operatorId);

    // STEP 5 =====================================
    //Transfer token to Emitter account
    const allowableCC=10;
    console.log(`\n Calling  transfer tokent to emitter account func.....`);
    const receiptStatus = await utils.callFunction('tokenTransferToEmitter', [allowableCC], 10000000, contractId, abi,client);
    console.log(receiptStatus);

    // STEP 6 =====================================
    //check token balance

    console.log("Query token balance for emitter account.....")
    await hederaUtils.balanceTokenQuery(emitterId);
    console.log("Query token balance for govt account.....")
    await hederaUtils.balanceTokenQuery(operatorId);


    // STEP 7 =====================================
    // send payback request to emitter
    const paybackCC=10;
    console.log(`\n Calling  payback request to emitter func.....`);
    const receiptStatus2= await utils.callFunction('sendPaybackReqToEmitter', [paybackCC], 10000000, contractId, abi,client);
    console.log(receiptStatus2);

    // STEP 8 =====================================
    // Accept payback request by emitter
    const isAccept=true;
    console.log(`\n Calling  payback request to emitter func.....`);
    const receiptStatus3= await utils.callFunction('acceptPaybackRequest', [isAccept], 10000000, contractId, abi,client);
    console.log(receiptStatus3);


    // check token and Hbar balance


}
main();








