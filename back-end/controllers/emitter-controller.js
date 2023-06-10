

const Emitter = require("../models/Emitters");
const Ticket = require("../models/Ticket");
const utils = require("../utils/utils");


require("dotenv").config({ path: "../.env" });


// Get Emitter by account Id
const getEmitterById = async (req, res) => {
  const accountId  = req.query.accountId;
  const emitterInfo = await Emitter.findOne({ accountId: accountId });
  if (emitterInfo) {
    try {
      return res.status(200).json(emitterInfo);
    } catch (error) {
       console.log(error);
      return res.status(500).json({message:error});
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



// Delete all existed emitters list
const deleteAllEmitters = async (req, res) => {
  try {
    await Emitter.deleteMany({});

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

    // Create a new user object
    const newUser = new Emitter({
      name,
      accountId,
      description,
      email,
      region,
      industryType,
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
  try {
    const ticketList = await Ticket.find();
    return res.status(200).json(ticketList);
  } catch (error) {
    return res.status(404).json({ message: "Ticket list not found" });
  }
};
// Get ticket by Id
const getTicketById = async (req, res) => {
  const ticketId  = req.query.ticketId;
  const ticketInfo = await Ticket.findOne({ tiketId: ticketId });
  
  if (ticketInfo) {
    try {
      return res.status(200).json(ticketInfo);
    } catch (error) {
       console.log(error);
      return res.status(500).json({message:"Internal server error"});
    }
  }
  return res.status(404).json({ message: "Ticket info not found" });
};

// Delete all existed ticket list
const deleteAllTicket = async (req, res) => {
  try {
    await Ticket.deleteMany({});
    return res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to delete!" });
  }
};


//*****  Web3 authentication needed */
// Emitter login API

const loginEmitter = async (req, res) => {
  const { accountId } = req.body;

  const emitter = await Emitter.findOne({ accountId: accountId });

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

  return res.status(401).json({ message: "User is not Emitter" });
};




module.exports = {
  registerEmitter,
  getAllEmitters,
  getEmitterById,
  checkEmitterExistanceByAccId,
  deleteAllEmitters,
  getAllTicketList,
  getTicketById,
  deleteAllTicket,
  loginEmitter,
};
