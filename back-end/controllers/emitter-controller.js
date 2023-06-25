//importing utils-sdk
const utilsSdk = require("../hedera-utils/utils-sdk");

const Emitter = require("../models/Emitters");
// const Govt = require("../models/Govt");
const Ticket = require("../models/Ticket");
const utils = require("../hedera-utils/utils");
const MRV = require("../models/mrv");
const { PrivateKey } = require("@hashgraph/sdk");
require("dotenv").config({ path: "../../.env" });
// To register new emitter
// const registerEmitter=async(req,res)=>{
//     try{
//      const emitter= await Emitter.create(req.body);
//      return res.status(200).json({message:"Registered successfully!"});
//     } catch(error){
//         console.log(error);
//         return res.status(500).json({message:"Registration failed !"});
//     }

// };

// Get Emitter by account Id
const getEmitterById = async (req, res) => {
  const accountId  = req.query.accountId;
  const emitterInfo = await Emitter.findOne({ accountId: accountId });
  // console.log(emitterInfo);
  if (emitterInfo) {
    try {
      return res.status(200).json(emitterInfo);
    } catch (error) {
      return console.log(error);
      //return res.status(404).json({message:"Ticket info not found"});
    }
  }
  return res.status(404).json({ message: "Emitter info not found" });
};
// Fetch all emitters details
const getAllEmitters = async (req, res) => {
  try {
    const emitterList = await Emitter.find(req.query);
    return res.status(200).json(emitterList);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Emitters details not found" });
  }
};

// Check wheather emitter exist or not
const checkEmitterExistanceByAccId = async (req, res) => {
  const accountId  = req.query.accountId;
  const emitter = await Emitter.findOne({ accountId: accountId });
  // console.log(emitter);
  if (emitter) {
    try {
      return res
        .status(200)
        .json({ message: "This account ID already exist !" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  return res.status(404).json({ message: "This user does not exist !" });
};

// POST API -> emitter send allowance request
const carbonAllowanceRequestTkt = async (req, res) => {
  const { accountId, raisedBy } = req.body;
  const isAccountExist = await Emitter.findOne({ accountId: accountId });
  // const isTkt= await Ticket.findOne({accountId:accountId});
  // console.log("THKHJJJJ");
  // console.log(isTkt);
  if (isAccountExist) {
    try {
      //const ticket=await Ticket.create(req.body);
      // Create a new ticket if the user is not already registered
      const newTicket = new Ticket({
        ticketId: utils.randomTktGenerator(),
        raisedBy: raisedBy,
        accountId: accountId,
        motive: "carbonAllowance",
        status: "pending",
      });
      newTicket.save();
      return res
        .status(200)
        .json({ message: "Allowance request sent successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Request failed !" });
    }
  }
  return res
    .status(404)
    .json({ message: "Allowance request failed,AccountId does not exist! " });
};

// Delete all existed emitters list
const deleteAllEmitters = async (req, res) => {
  try {
    await Emitter.deleteMany({});

    // disscociating token
    // const tokenDissociationStatus = await utilsSdk.dissociateTokenWithAccount(
    //   accountId,
    //   pvtkey
    // );
    return res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to delete!" });
  }
};

//////////////++++++++++++++++++++

// Create a POST endpoint to register a new user
const registerEmitter = async (req, res) => {
  try {
    const { name, accountId, description, email, region, industryType } =
      req.body;
   
    // Check if user exists in the database
    const existingUser = await Emitter.findOne({ accountId: accountId });
    if (existingUser) {
      return res.status(404).send({ message: "User already exists." });
    }
    const balhbar= await utilsSdk.checkHbarBal(accountId);
    const x=parseFloat(balhbar.toString());
 //console.log(x);
    // Create a new user object
    const newUser = new Emitter({
      name,
      accountId,
      description,
      email,
      region,
      industryType,
      availableHbar:x,
      //ticketId: null // initialize with null
    });

    // Save the new user object to the database
    await newUser.save();

    // Create a new ticket if the user is not already registered
    const newTicket = new Ticket({
      ticketId: utils.randomTktGenerator(),
      raisedBy: name,
      accountId: accountId,
      motive: "eVerification",
      status: "pending",
    });

    // Save the new ticket to the database
    newTicket.save();

    // // Send a response to the client
    return res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
};

// Get ticket detail
const getAllTicketList = async (req, res) => {
  console.log("Get All tkt");
  try {
    const ticketList = await Ticket.find();
    // console.log(ticketList);
    return res.status(200).json(ticketList);
  } catch (error) {
    return res.status(404).json({ message: "Ticket list not found" });
  }
};
// Get ticket by Id
const getTicketById = async (req, res) => {
  const ticketId  = req.query.ticketId;
  const ticketInfo = await Ticket.findOne({ tiketId: ticketId });
  console.log(ticketInfo);
  if (ticketInfo) {
    try {
      return res.status(200).json(ticketInfo);
    } catch (error) {
      return console.log(error);
      //return res.status(404).json({message:"Ticket info not found"});
    }
  }
  return res.status(404).json({ message: "Ticket info not found" });
};

// Delete all existed ticket list
const deleteAllTicket = async (req, res) => {
  try {
    await Ticket.deleteMany({});
    // const pvtkey = PrivateKey.fromString(
    //   utils.mapPrivateKeywithId(accountId)
    // );
    return res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to delete!" });
  }
};
//*************************************** */

//*****  Web3 authentication needed */
// Emitter login API

const loginEmitter = async (req, res) => {
  const { accountId } = req.body;

  const emitter = await Emitter.findOne({ accountId: accountId });

  //console.log(emitter)

  // Check for govt or MRV

  const govtAccount = "0.0.3885341";

  const mrvAccount = "0.0.4376836"; // Plz assign mrv account Id

  if (accountId == govtAccount) {
    return res.status(200).send({ message: "Redirect to govt dashboard" });
    // return res.status(500).json({message:`redirect to govt dashboard:${Govt.isGovernment}`});

  }

  if (accountId == mrvAccount) {
    return res.status(200).send({ message: "Redirect to MRV dashboard" });
  }

  if (!emitter) {
    return res
      .status(200)
      .json({
        message: "Emitter not found redirect to registration dashboard",
      }); // Call emitter registration API
  } else if (emitter.isEmitter) {
    try {
      return res.status(200).json({ message: "Redirect to Emitter Dashboard" });
    } catch (err) {
      console.log(err);
    }
  }

  return res.status(404).json({ message: "User is not Emitter" });
};

// Emitter accept the payback request sent by govt
const emitterAcceptPaybackReq = async (req, res) => {
  const { accountId } = req.body;
  //const pvtKey = mapPrivateKeywithId.valueTable[accountId] || 0;

  const emitter = await Emitter.findOne({ accountId: accountId });
  try {
    if (!emitter) {
      return res.status(404).json({ message: "Emitter not found" });
    }
    if (!emitter.paybackCC) {
      return res
        .status(500)
        .json({ message: "Emitter already paid paybackCC" });
    }
    if (emitter.remainingCC >= emitter.paybackCC) {
      const payCC = emitter.paybackCC;
      const remainingBal = emitter.remainingCC;
      await MRV.findOneAndUpdate(
        { emitterAccountId: accountId },
        { paybackCC: 0 }
      ); // need to modify
      await Emitter.findOneAndUpdate(
        { accountId: accountId },
        { paybackCC: 0, remainingCC: remainingBal - payCC }
      );
      await Ticket.updateMany(
        { accountId: accountId, motive: "payback", status: "pending" },
        { status: "completed", closedAt: Date.now() }
      );
      // Call payback function from hedera-sdk-utils

      const pvtkey = PrivateKey.fromString(
        utils.mapPrivateKeywithId(accountId)
      );
      const tokenTransferStatus = await utilsSdk.paybackToGovtAccount(
        accountId,
        payCC,
        pvtkey
      );
      console.log(tokenTransferStatus);
      const mrvUpdate = await MRV.findOneAndUpdate({ accountId: accountId}, { dueDate: null });
      const e = await Emitter.findOneAndUpdate({ accountId: accountId }, { dueDate: null });

      return res.status(200).json({ message: "Payback request accepted successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerEmitter,
  getAllEmitters,
  getEmitterById,
  checkEmitterExistanceByAccId,
  carbonAllowanceRequestTkt,
  deleteAllEmitters,
  getAllTicketList,
  getTicketById,
  deleteAllTicket,
  loginEmitter,
  emitterAcceptPaybackReq,
};
