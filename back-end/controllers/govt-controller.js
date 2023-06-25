//Import dependencies
const {
  TransferTransaction,
  Client,
  PrivateKey,
  TokenAssociateTransaction,
  Hbar,
  AccountBalanceQuery,
  Wallet,
} = require("@hashgraph/sdk");

//importing utils-sdk
const utilsSdk = require("../hedera-utils/utils-sdk");

const govt = require("../models/Govt");
const Emitter = require("../models/Emitters");
const Ticket = require("../models/Ticket");
const MRV = require("../models/mrv");
const utils = require("../hedera-utils/utils");

const registerGovt = async (req, res) => {
  const isGovernment = await govt.findOne({ isGovernment: true });
  console.log(isGovernment);
  if (isGovernment) {
    return res.status(400).json({ message: "Government already exist" });
  }
  try {
    const government = await govt.create(req.body);
    return res
      .status(200)
      .json({ message: "Government registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

const findUserRegisterDetails = async (req, res) => {
  try {
    const userList = await Emitter.find({ isEmitter: false });

    return res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch!!" });
  }
};
const getGovtDetails = async (req, res) => {
  try {
    const govtDetails = await govt.find(req.query);
    return res.status(200).json(govtDetails);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Government details not found !" });
  }
};
// PUT api to accept the emitter registration

const acceptEmitterRegistrationRequest = async (req, res) => {
  const { accountId } = req.body;
  try {
    //const emitter = await Emitter.findOneAndUpdate({accountId}, req.body); // it can be used for multiple fields
    const emitter = await Emitter.findOne({ accountId });
    if (!emitter) {
      return res.status(404).json({ message: "Emitter details not found" });
    }
    if (emitter.isEmitter) {
      return res.status(400).json({ message: "Emitter already been approved" });
    }
    await Emitter.findOneAndUpdate({ accountId }, { isEmitter: true });
    await Ticket.findOneAndUpdate(
      { accountId: accountId },
      { status: "completed", closedAt: Date.now() }
    );
    // create new data in mrv

    const mrv = await MRV.findOne({ emitterAccountId: accountId });
    // console.log('mrv',mrv);
    if (!mrv) {
      const newMRV = new MRV({
        emitterAccountId: accountId,
      });
      newMRV.save();
    }

    // call associate function
    const pvtkey = PrivateKey.fromString(utils.mapPrivateKeywithId(accountId));
    const associateStatus = await utilsSdk.tokenAssociateWithAccount(
      accountId,
      pvtkey
    );
    // console.log(associateStatus);
    return res.status(200).json({ message: "Updated Emitter details" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// DELETE api to reject and delete emitter request
const rejectEmitterRegistrationRequest = async (req, res) => {
  const { accountId } = req.body;
  const emitter = await Emitter.findOne({ accountId: accountId });
  //console.log(emitter.isEmitter)
  //   console.log('accountId',accountId )
  if (emitter) {
    if (!emitter.isEmitter) {
      try {
        await Emitter.findOneAndDelete({ accountId: accountId });
        await Ticket.findOneAndDelete({ accountId: accountId });
        return res.status(200).json({ message: "Deleted Emitter details" });
      } catch (err) {
        console.log(err);
      }
    }
  }
  return res.status(500).json({ message: "Emitter Not Found" });
};

// PUT api to accept the emitter CC allowance

const acceptEmitterCCAllowanceRequest = async (req, res) => {
  const { accountId } = req.body;
  try {
    const emitterMRVdata = await MRV.findOne({ emitterAccountId: accountId });
    // console.log(emitterMRVdata);
    if (!emitterMRVdata) {
      return res.status(404).json({ message: "Emitter MRV data not found" });
    }
    if (!emitterMRVdata.allowableCarbonCredits) {
      return res.status(404).json({ message: " MRV not set CC allowance" });
    }
    const emitter = await Emitter.findOneAndUpdate(
      { accountId: accountId },
      {
        allowableCarbonCredits: emitterMRVdata.allowableCarbonCredits,
        allowableCarbonEmission: emitterMRVdata.allowableCarbonEmission,
        remainingCC: emitterMRVdata.allowableCarbonCredits,
      }
    );
    const tkt = await Ticket.findOneAndUpdate(
      { accountId: accountId, motive: "carbonAllowance" },
      { status: "completed", closedAt: Date.now() }
    );

    if (!emitter) {
      return res.status(404).json({ message: "Emitter details not found" });
    }
    // Call Token Transfer function
    // call associate acc with token 
    const tokenAmount = emitterMRVdata.allowableCarbonCredits;
    const tokenTransferStatus = await utilsSdk.tokenTransferToAccount(
      accountId,
      tokenAmount
    );
    console.log(tokenTransferStatus);

    return res.status(200).json({ message: "Updated Emitter details" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// PUT api to send request for payback to  Emitter by account Id
const paybackRequestToEmitterByAcId = async (req, res) => {
  const { accountId } = req.body;
  const emitter = await MRV.findOne({ emitterAccountId: accountId });
  if (!emitter) {
    return res.status(404).json({ message: " Emitter not found in MRV" });
  }

  if (emitter.paybackCC) {
    try {
      const currentDate = new Date();

      // Add one day to the current date
      const dueDate = new Date();
      dueDate.setDate(currentDate.getDate() + 1);
      // Format the dates as strings (optional)
      const currentDateStr = currentDate.toISOString().split('T')[0];
      const dueDateStr = dueDate.toISOString().split('T')[0];
      const mrvUpdate = await MRV.findOneAndUpdate({ emitterAccountId: accountId }, { dueDate: dueDateStr });
      const e = await Emitter.findOneAndUpdate({ accountId: emitter.emitterAccountId }, {
        paybackCC: emitter.paybackCC,
        carbonEmitted: emitter.carbonEmitted,
        dueDate: dueDateStr
      });

      // Create a new ticket for payback request to emitter
      const newTicket = new Ticket({
        ticketId: utils.randomTktGenerator(),
        raisedBy: "Government",
        accountId: emitter.emitterAccountId,
        motive: 'payback',
        status: 'pending'
      });
      // save the ticket to db
      newTicket.save();

    } catch (error) {
      console.log(error);
    }
  }

  return res.status(200).json({ message: "Request for PaybackCC sent successfully" });

}

// PUT api to send request for payback to all Emitter
const paybackRequestToEmitter = async (req, res) => {
  const emitterList = await MRV.find();
  if (!emitterList) {
    return res.status(404).json({ message: " Emitters are not found" });
  }

  for (let i = 0; i < emitterList.length; i++) {
    if (emitterList[i].paybackCC) {
      try {

        const currentDate = new Date();
        // Add one day to the current date
        const dueDate = new Date();
        dueDate.setDate(currentDate.getDate() + 1);
        // Format the dates as strings (optional)
        const currentDateStr = currentDate.toISOString().split('T')[0];
        const dueDateStr = dueDate.toISOString().split('T')[0];

        const accId = emitterList[i].emitterAccountId;
        const mrvUpdate = await MRV.findOneAndUpdate({accountId: emitterList[i].emitterAccountId }, {dueDate: emitterList[i].dueDateStr });
        const e = await Emitter.findOneAndUpdate(
          { accountId: emitterList[i].emitterAccountId },
          {
            paybackCC: emitterList[i].paybackCC,
            carbonEmitted: emitterList[i].carbonEmitted,
            dueDate: dueDateStr
          }
        );

        // Create a new ticket for payback request to emitter
        const newTicket = new Ticket({
          ticketId: utils.randomTktGenerator(),
          raisedBy: "Government",
          accountId: emitterList[i].emitterAccountId,
          motive: "payback",
          status: "pending",
        });
        // save the ticket to db
        newTicket.save();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return res
    .status(200)
    .json({ message: "Request for PaybackCC sent successfully" });
};

// Check token balance
const checkTokenBalance = async (req, res) => {
  const { accountId } = req.body;
  return res.status(200).json({
    message: `Balance is :${await utilsSdk.balanceTokenQuery(accountId)}`,
  });
};

// Freeze Emitter account
const freezeAccountByGovt = async (req, res) => {
  const currentDate = new Date();
  const currentDateStr = currentDate.toISOString().split('T')[0];
  const { accountId } = req.body;
  const emitter = await Emitter.findOne({ accountId: accountId });
  if (emitter.dueDate == currentDateStr) {
    const mrvUpdate = await MRV.findOneAndUpdate({ emitterAccountId: accountId }, { dueDate: null });
    const e = await Emitter.findOneAndUpdate({ accountId: emitter.emitterAccountId }, { dueDate: null });
    return res.status(200).json({ message: `Freezed Emitter Account by Govt is :${await utilsSdk.freezeEmitterAccount(accountId)}` });
  }
  else {
    return res.status(400).json({ message: `remaining due date for payback` });

  }

}

// Get API to fetch the emitter details who requested for CC Allowance
// const getEmitterDetailRequestedForCC = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({
//       motive: "carbonAllowance",
//       status: "pending"
//     }).select("accountId");

//     const accountIDs = tickets.map(ticket => ticket.accountId);

//     const emitters = await Emitter.find({
//       accountId: { $in: accountIDs }
//     });
//     res.status(200).json(emitters);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// }
// Get API to fetch the emitter details govt portal who requested for CC Allowance with MRV setted Details on the govt dashboard today 5/17/2023
const getEmitterDetailsRequestForCCFromMRV = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      motive: "carbonAllowance",
      status: "pending"
    }).select("accountId");
    const accountIDs = tickets.map(ticket => ticket.accountId);
    const mrvDetails = await MRV.find({ emitterAccountId: accountIDs,paybackCC:0,carbonEmitted:0});
    res.status(200).json(mrvDetails);
  } catch (err) {
    res.status(500).json({ message:'not found details for cc request'});
  }
}

//get Payback requestDetails on the govt portal from emitters....Govt Dashboard today 5/17/2023
const getPaybackDetailsRequestByGovt = async (req, res) => {
  try{
  const mrvDetails = await MRV.find({paybackCC:{$gt:0}});
  return res.status(200).json(mrvDetails);
 } catch (err) {
    return res.status(500).json({ message:'not found details for payback request'});
  }
}

// get by id
// Get API to fetch the emitter details govt portal who requested for CC Allowance with MRV setted Details on the govt dashboard today 5/17/2023
const getEmitterDetailsRequestForCCFromMRVById = async (req, res) => {
  const accountId = req.query.accountId;
  try {
    // allowableCarbonCredits: {$gt:0}, allowableCarbonEmission: {$gt:0},carbonEmitted: 0
    const mrvDetail = await MRV.findOne({ emitterAccountId: accountId,allowableCarbonCredits: {$gt:0}, allowableCarbonEmission: {$gt:0},carbonEmitted: 0});
    return res.status(200).json(mrvDetail);
  } catch (err) {
    return res.status(500).json({ message: "No requests found for cc allowance" });
  }
}
// get by id to fetch all emitter details from MRV in govt dashboard 
const getPaybackDetailsRequestByGovtById = async (req, res) => {
  const accountId = req.query.accountId;
  try{
  const mrvDetails = await MRV.findOne({emitterAccountId: accountId,paybackCC:{$gt:0}});
  if(mrvDetails){
  return res.status(200).json(mrvDetails);
  }
  return res.status(404).json({message: "No request found"});
 } catch (err) {
    return res.status(500).json({ message:'not found details for payback request'});
  }
}
module.exports = {
  registerGovt,
  getGovtDetails,
  acceptEmitterRegistrationRequest,
  rejectEmitterRegistrationRequest,
  acceptEmitterCCAllowanceRequest,
  paybackRequestToEmitter,
  paybackRequestToEmitterByAcId,
  checkTokenBalance,
  findUserRegisterDetails,
  freezeAccountByGovt,
  getEmitterDetailsRequestForCCFromMRV,
  getPaybackDetailsRequestByGovt,
  getEmitterDetailsRequestForCCFromMRVById,
  getPaybackDetailsRequestByGovtById
};
