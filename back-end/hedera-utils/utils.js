//Import dependencies
const {
    TransferTransaction, Client, PrivateKey,
    TokenAssociateTransaction, Hbar,
    AccountBalanceQuery, Wallet
} = require("@hashgraph/sdk");

require('dotenv').config();
// Create random ticket Id
module.exports.randomTktGenerator = () => {
    const length = 12;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';
    let ticketId = '';
    for (let i = 0; i < length; i++) {
        ticketId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    //console.log(ticketId)
    return ticketId;
}



module.exports.mapPrivateKeywithId = (accountID) => {

    const Acc1 = process.env.Account1_Id;
    const Acc2 = process.env.Account2_Id;
    const Acc3 = process.env.Account3_Id;
    const pvt1 = process.env.Account1_PVKEY;
    const pvt2 = process.env.Account2_PVKEY;
    const pvt3 = process.env.Account3_PVKEY;
    const valueTable = {

        [Acc1]: pvt1,

        [Acc2]: pvt2,

        [Acc3]: pvt3

    };
    // const x = valueTable[region][industryType] || 0;
    return valueTable[accountID];
}

//module.exports=randomTktGenerator;
//const t=randomTktGenerator();
// console.log("Hi");
//console.log(!0)
