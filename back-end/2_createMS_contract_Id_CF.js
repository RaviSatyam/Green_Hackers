console.clear();

require("dotenv").config();
const {
    AccountId,
    PrivateKey,
    Client
} = require("@hashgraph/sdk");


const utils = require("./utils/contract_utils");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID); //purchaser
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

// Emitter
const emitterId= AccountId.fromString(process.env.Account1_Id);

// Token
const tokenId=process.env.TOKEN_ID;


const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const contractId=process.env.FACTORY_CONTRACT_ID;

async function main() {
  
        console.log('contractID', contractId);

        console.log(`\n- New Contract Id created ......`);
        // STEP 1 =====================================

        // Set Params

       const msParams = await utils.contractParamsBuilderFcnEC(emitterId,operatorId,tokenId,2);
        const gasLimit = 10000000;
        const payableAmt = 0;

       // console.log(msParams);

    
        //const msParams=[];
        const add_newSC_status = await utils.contractExecuteFcn(contractId, gasLimit, "createContract", msParams, payableAmt,client,2);
    
        console.log(`\n Created new SC with Status :${add_newSC_status}`)
       

        

}
main();

   
