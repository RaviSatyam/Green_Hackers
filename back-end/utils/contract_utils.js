
const {
    ContractCreateTransaction,
    ContractFunctionParameters,
    ContractExecuteTransaction,
    ContractCallQuery,
    TransferTransaction,
    ContractInfoQuery,
    ContractCreateFlow,
    Hbar,
    AccountBalanceQuery,
    AccountCreateTransaction,
    FileAppendTransaction,
    FileCreateTransaction
} = require("@hashgraph/sdk");

const Web3 = require('web3');
//const web3 = new Web3;




              //###############################################################//
             //      Functions related to Contract deployment on hedera        //
//#############################################################################################################


// Function to create bytecode file Id using file append Txn function

async function createByteCodeFileId(bytecode,client,operatorKey) {
    const fileCreateTx = await new FileCreateTransaction()

        //Set the bytecode of the contract
        .setKeys([operatorKey])
        .freezeWith(client)
        .sign(operatorKey);

    //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(client);

    //Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(client);

    //Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId;

    //Log the file ID
    // console.log("The smart contract byte code file ID is " + bytecodeFileId)
    const fileAppendTx = await new FileAppendTransaction()
        .setFileId(bytecodeFileId)
        .setContents(bytecode)
        .setMaxChunks(1000)
        .freezeWith(client)
        .sign(operatorKey);

    const fileAppendSubmit = await fileAppendTx.execute(client);

    const fileAppendRx = fileAppendSubmit.getReceipt(client);
    const fileAppendStatus = (await fileAppendRx).status;

    return [bytecodeFileId, fileAppendStatus];


}

// Function to deploy contract on hedera network and return contract Id

async function createContractFactoryContractId(bytecodeFileId,gasLimit,client) {
    console.log("################### Calling createContractId function #######################################");
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
        //Set the file ID of the Hedera file storing the bytecode
        .setBytecodeFileId(bytecodeFileId)
        //Set the gas to instantiate the contract
        .setGas(gasLimit);

    //Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(client);

    //Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(client);

    //Get the smart contract ID
    const contractID = contractReceipt.contractId;

    //Log the smart contract ID
    // console.log("The smart contract ID is " + contractID);

    const contractAddress = contractID.toSolidityAddress();

    return [contractID, contractAddress];

}


             //####################################################################//
             //   Functions related to set the params and add the data on hedera  //
//#############################################################################################################

// To set parameters

async function contractParamsBuilderFcnEC(emitterId,govtId,tokenId, section) {
    let builtParams = [];
    if (section === 2) {
        builtParams = new ContractFunctionParameters()
            .addAddress(emitterId.toSolidityAddress())
            .addAddress(govtId.toSolidityAddress())
            .addAddress(tokenId.toSolidityAddress());
       
    } 
    
    return builtParams;
}

// Contract execute function to add MS

async function contractExecuteFcn(cId, gasLim, fcnName, params, amountHbar,client,section) {
    if(section===2){

        const contractExecuteTx = new ContractExecuteTransaction()
        .setContractId(cId)
        .setGas(gasLim)
        .setFunction(fcnName, params)
        .setPayableAmount(amountHbar);
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    //const contractExecuteRec = await contractExecuteSubmit.getRecord(client);// This will return all data->including logs,txnId,Timestamp etc
    const getReceipt=await contractExecuteSubmit.getReceipt(client);
    return getReceipt.status;

    } else if(section===3){
        const contractExecuteTx = new ContractExecuteTransaction()
        .setContractId(cId)
        .setGas(gasLim)
        .setFunction(fcnName)
        .setPayableAmount(amountHbar);
    const contractExecuteSubmit = await contractExecuteTx.execute(client);
    //const contractExecuteRec = await contractExecuteSubmit.getRecord(client);// This will return all data->including logs,txnId,Timestamp etc
    const getReceipt=await contractExecuteSubmit.getReceipt(client);
    return getReceipt.status;
    }
    return "Parameters mismatch";
   
}



//


async function contractParamsBuilderFcn(id, name, resolveTime, budget, noRevision, section) {
    let builtParams = [];
    if (section === 2) {
        builtParams = new ContractFunctionParameters()
            // .addAddress(aId.toSolidityAddress())
            // .addAddress(tId.toSolidityAddress());
            .addUint256(id)
            .addString(name)
            .addUint256(resolveTime)
            .addUint256(budget * 1e8)
            .addUint256(noRevision);
    } else if (section === 3) {
        builtParams = new ContractFunctionParameters()
        .addUint256(id);
            // .addAddress(budget.toSolidityAddress())
            // .addAddress(noRevision.toSolidityAddress());
            
    } 
    return builtParams;
}


//

async function addMS_details(functionName, parameters, gas, contractId, abi,client,amountHbar) {

    // generate function call with function name and parameters
    // const functionCallAsUint8Array = await encodeFunctionCall(functionName, parameters, abi);

    // console.log('functionCallAsUint8Array',functionCallAsUint8Array)

    console.log("Hi Iam here.........")

    // execute the transaction
    try {
        const transaction = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(gas)
    .setFunction(functionName, parameters)
    .setPayableAmount(amountHbar);
    //get receipt
    console.log('ddddddddd');
    const contractExecuteSubmit = await transaction.execute(client);
    console.log('-----0000------');
    console.log('Client--',client);
    console.log('contractExecuteSubmit--',contractExecuteSubmit);
   // const receipt = await contractExecuteSubmit.getReceipt(client);
    // a record contains the output of the function
    const record = await contractExecuteSubmit.getRecord(client);
    return record;
        
    } catch (error) {
        console.log(error);
        return error;
    }
    
    

   
    // const results = await decodeFunctionResult(functionName, record.contractFunctionResult.bytes, abi);
    // return results;
}


// Encode the function

async function encodeFunctionCall(functionName, parameters, abi) {
    const functionAbi = abi.find(func => (func.name === functionName && func.type === "function"));
    const encodedParametersHex = Web3.eth.abi.encodeFunctionCall(functionAbi, parameters).slice(2);
    return Buffer.from(encodedParametersHex, 'hex');
}


// Decode the function results

async function decodeFunctionResult(functionName, resultAsBytes, abi) {

    console.log("decodeFunctionResult STARTS HERE");
    const functionAbi = abi.find(func => func.name === functionName);
    const functionParameters = functionAbi.outputs;

    const resultHex = '0x'.concat(Buffer.from(resultAsBytes).toString('hex'));

    const result = Web3.eth.abi.decodeParameters(functionParameters, resultHex);

    return result;
}


//


              //######################################################//
             //       Query the smart contract functions             //
//#############################################################################################################


// Get MS Info

async function getMS_details(functionName, parameters, gas, contractId, abi,client) {

    // generate function call with function name and parameters
    const functionCallAsUint8Array = await encodeFunctionCall(functionName, parameters, abi);

    // execute the transaction
    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setFunctionParameters(functionCallAsUint8Array)
        .setGas(gas)
        .execute(client);
    //get receipt
    const receipt = await transaction.getReceipt(client);
    // a record contains the output of the function
    const record = await transaction.getRecord(client);

   
    const results = await decodeFunctionResult(functionName, record.contractFunctionResult.bytes, abi);
    return results;
}


// Encode the function

async function encodeFunctionCall(functionName, parameters, abi) {
    const functionAbi = abi.find(func => (func.name === functionName && func.type === "function"));
    const encodedParametersHex = Web3.eth.abi.encodeFunctionCall(functionAbi, parameters).slice(2);
    return Buffer.from(encodedParametersHex, 'hex');
}


// Decode the function results

async function decodeFunctionResult(functionName, resultAsBytes, abi) {

    console.log("decodeFunctionResult STARTS HERE");
    const functionAbi = abi.find(func => func.name === functionName);
    const functionParameters = functionAbi.outputs;

    const resultHex = '0x'.concat(Buffer.from(resultAsBytes).toString('hex'));

    const result = Web3.eth.abi.decodeParameters(functionParameters, resultHex);

    return result;
}


// Call function

async function callFunction(functionName, parameters, gas, contractId, abi,client) {

    // generate function call with function name and parameters
    const functionCallAsUint8Array = await encodeFunctionCall(functionName, parameters, abi);

    // execute the transaction
    const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setFunctionParameters(functionCallAsUint8Array)
        .setGas(gas)
        .execute(client);
    //get receipt
    const receipt = await transaction.getReceipt(client);
    // a record contains the output of the function
   // const record = await transaction.getRecord(client);

    

   
    return receipt.status;
}



// Account balance query

async function queryBalance(accountId,client){
    //Create the account balance query
const query = new AccountBalanceQuery()
.setAccountId(accountId);

//Submit the query to a Hedera network
const accountBalance = await query.execute(client);

//Print the balance of hbars
console.log("The hbar account balance for this account is " +accountBalance.hbars);


}

//Contract balance query
async function showContractBalanceFcn(cId,client) {
	const info = await new ContractInfoQuery().setContractId(cId).execute(client);
	console.log(`- Contract balance (ContractInfoQuery SDK): ${info.balance.toString()}`);
} 


// function to pay fund to contract
async function contractExecuteNoFcn(cId, gasLim, amountHbar,client) {
	const contractExecuteTx = new ContractExecuteTransaction()
		.setContractId(cId)
		.setGas(gasLim)
		.setPayableAmount(amountHbar);
	const contractExecuteSubmit = await contractExecuteTx.execute(client);
	const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
	return contractExecuteRx;
}


module.exports={createByteCodeFileId,createContractFactoryContractId,contractParamsBuilderFcnEC,contractExecuteFcn,
    contractParamsBuilderFcn,addMS_details,getMS_details,callFunction,queryBalance,contractExecuteNoFcn,showContractBalanceFcn}