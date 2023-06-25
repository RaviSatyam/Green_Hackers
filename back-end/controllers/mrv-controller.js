const Emitter = require("../models/Emitters");
const Ticket = require("../models/Ticket");
const MRV = require("../models/mrv");
const utils = require("../hedera-utils/utils");

// PUT api to set allowance CC for each individual Emitter

const setCCallowance = async (req, res) => {
    const { accountId, region, industryType } = req.body;
    const emitter = await Emitter.findOne({ accountId: accountId });
    if (!emitter) {
        return res.status(404).json({ message: "Emitter details not found" });
    }
    console.log(emitter);
    const valueTable = {

        IND: {
            Manufacturing: 900,
            Automotive: 700,
            IT: 300,
            Transportation: 500
        },

        USA: {
            Manufacturing: 800,
            Automotive: 600,
            IT: 250,
            Transportation: 400
        },

        UAE: {
            Manufacturing: 750,
            Automotive: 550,
            IT: 270,
            Transportation: 350
        }

    };
    const x = valueTable[region][industryType] || 0;
    const cc = x ;

    if (emitter.isEmitter && !emitter.allowableCarbonEmission) {
        try {

            await MRV.findOneAndUpdate({ emitterAccountId: accountId }, { allowableCarbonEmission: x, allowableCarbonCredits: cc });

            return res.status(200).json({ message: "CC allowance set successfully " });
        } catch (err) {
            console.log(err);

        }
    }
    return res.status(500).json({ message: "User is not an Emitter or CC allowance already set" })
};



// PUT api to set allowance CC for all sorted Emitters
const setCCallowanceToAllSortedEmitter = async (req, res) => {
    const { region, industryType } = req.body;
    const emitterList = await Emitter.find({ region: region, industryType: industryType })

    const valueTable = {

        IND: {
            Manufacturing: 900,
            Automotive: 700,
            IT: 300,
            Transportation: 500
        },

        USA: {
            Manufacturing: 800,
            Automotive: 600,
            IT: 250,
            Transportation: 400
        },

        UAE: {
            Manufacturing: 750,
            Automotive: 550,
            IT: 270,
            Transportation: 350
        }

    };
    const x = valueTable[region][industryType] || 0;
    const cc = x ;
    //const value = valueTable[region][industryType] || 0; // set a default value if region or industry type is not recognized

    console.log(`The value for region ${region} and industry type ${industryType} is ${x}.`);
    //const emitter=await Emitter.findOne({accountId:accountId});
    if (!emitterList) {
        return res.status(404).json({ message: "Emitter details not found" });
    }
    console.log(emitterList);
    //checkList
    //let result1=[];
    //Loop
    for (let i = 0; i < emitterList.length; i++) {
        let accountId = emitterList[i].accountId;
        if (emitterList[i].isEmitter && !emitterList[i].allowableCarbonEmission) {
            try {

                const e = await MRV.findOneAndUpdate({ emitterAccountId: accountId }, { allowableCarbonEmission: x, allowableCarbonCredits: cc });
                //result1.push(e);
                //res.status(200).json({message: "CC allowance set successfully "});
            } catch (err) {
                console.log(err);
            }
        }
    }
    // console.log("Print updated list")
    // console.log(result1);
    return res.status(200).json({ message: "CC allowance set to all Emitters" })
};



// PUT api to set payback CC for individual Emitter
const setCCpayback = async (req, res) => {
    const { accountId, region, industryType } = req.body;
    const emitter = await Emitter.findOne({ accountId: accountId });
    if (!emitter) {
        return res.status(404).json({ message: "Emitter details not found" });
    }
    //console.log(emitter);
    const valueTable = {

        IND: {
            Manufacturing: 90,
            Automotive: 70,
            IT: 30,
            Transportation: 50
        },

        USA: {
            Manufacturing: 80,
            Automotive: 60,
            IT: 25,
            Transportation: 40
        },

        UAE: {
            Manufacturing: 75,
            Automotive: 55,
            IT: 27,
            Transportation: 35
        }

    };
    const x = valueTable[region][industryType] || 0;
    const cc = x ;
    // const currentDate = new Date();
    // const durationInDays = 5;


    if (emitter.isEmitter && emitter.allowableCarbonEmission) {
        try {
            const eMRV = await MRV.findOne({ emitterAccountId: accountId })
            const x1 = eMRV.carbonEmitted + x;
            const y1 = eMRV.paybackCC + cc;
            // const payDate = new Date(currentDate.getTime() + durationInDays * 24 * 60 * 60 * 1000);
            await MRV.findOneAndUpdate({ emitterAccountId: accountId }, { carbonEmitted: x1, paybackCC: y1 });

            return res.status(200).json({ message: "CC payback set successfully " });
        } catch (err) {
            console.log(err);

        }
    }
    return res.status(500).json({ message: "User is not an Emitter or CC allowance not set" })
};

// PUT api to set allowance CC for all sorted Emitters
const setCCpaybackToAllSortedEmitter = async (req, res) => {
    const { region, industryType } = req.body;
    const emitterList = await Emitter.find({ region: region, industryType: industryType })

    const valueTable = {
        IND: {
            Manufacturing: 90,
            Automotive: 70,
            IT: 30,
            Transportation: 50
        },

        USA: {
            Manufacturing: 80,
            Automotive: 60,
            IT: 25,
            Transportation: 40
        },

        UAE: {
            Manufacturing: 75,
            Automotive: 55,
            IT: 27,
            Transportation: 35
        }

    };
    const x = valueTable[region][industryType] || 0;
    const cc = x ;
    //const value = valueTable[region][industryType] || 0; 
    // set a default value if region or industry type is not recognized

    //console.log(`The value for region ${region} and industry type ${industryType} is ${x}.`);
    //const emitter=await Emitter.findOne({accountId:accountId});

    // const currentDate = new Date();
    // const durationInDays = 5;

    if (!emitterList) {
        return res.status(404).json({ message: "Emitter details not found" });
    }
    console.log(emitterList);
    //checkList
    let result1 = [];
    //Loop
    for (let i = 0; i < emitterList.length; i++) {
        // let accountId = emitterList[i].accountId;
        if (emitterList[i].isEmitter && emitterList[i].allowableCarbonEmission) {
            try {
                let accountId = emitterList[i].accountId;
                const eMRV = await MRV.findOne({ emitterAccountId: accountId })
                const x1 = eMRV.carbonEmitted + x;
                const y1 = eMRV.paybackCC + cc;
                // const payDate = new Date(currentDate.getTime() + durationInDays * 24 * 60 * 60 * 1000);
                //console.log(`x1:${x1},y1:${y1}`);
                const e = await MRV.findOneAndUpdate({ emitterAccountId: accountId }, { carbonEmitted: x1, paybackCC: y1 });
                // result1.push(e);
                //res.status(200).json({message: "CC allowance set successfully "});
            } catch (err) {
                console.log(err);
            }
        }
    }
    // console.log("Print updated list")
    // console.log(result1);
    return res.status(200).json({ message: "CC payback set to all Emitters" })
};


// Delete all MRV data
// Delete all existed ticket list
const deleteAllmrv = async (req, res) => {
    try {
        await MRV.deleteMany({});
        return res.status(200).json({ message: "Deleted successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to delete!" });
    }
}


// Fetch all mrv details
const getAllmrv = async (req, res) => {
    try {
        const mrvList = await MRV.find(req.query);
        return res.status(200).json(mrvList);
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: "Emitters details not found" });
    }
};

// Get all Emitter details whose isEmitter == true (before setting cc allowance)
const getAllEmitterBeforeCC = async (req, res) => {
    try {
        const emitters = await Emitter.find({ isEmitter: true, allowableCarbonEmission: 0, allowableCarbonCredits: 0 });
        return res.status(200).json(emitters);
    } catch (err) {
        return res.status(404).json({ message: "No emitters found" });
    }
}

// Get api to fetch allowance CC for all sorted Emitters ()
const getCCallowanceRequestToAllSortedEmitter = async (req, res) => {
    const region = req.query.region;
    const industryType=req.query.industryType;
   // const region=req.params.region;
    try {
        const emitter = await Emitter.find({ region: region, industryType: industryType, isEmitter: true, allowableCarbonCredits: 0, allowableCarbonEmission: 0 });
        return res.status(200).json(emitter);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "no available data on this region & Industry basis" });
    }
}

// Get api for Setting PaybackDetails For AllEmiter by region and industryType - MRV DASHBOARD ....Updated
const getPaybackRequestDetailsByAllSortedEmitter = async (req, res) => {
    try {
        const region = req.query.region;
        const industryType=req.query.industryType;
        const mrvList = await Emitter.find({ region, industryType }).select("accountId");
        const accountIDs = mrvList.map(emitter => emitter.accountId);
        const mrvDetails = await MRV.find({ emitterAccountId: accountIDs,paybackCC:0,carbonEmitted:{$gte:0},allowableCarbonCredits:{$gt:0},allowableCarbonEmission:{$gt:0}});
           return res.status(200).json(mrvDetails);
    } catch (err) {
          return res.status(500).json({ message:'not found details for cc request'});
          }
}

//get MRVDetailsByAccountId .......updated
const getMRVDetailsByAccountId = async (req, res) => {
   const accountId  = req.query.accountId;
   console.log(accountId);
    try {
        const mrvDetails = await MRV.findOne({ emitterAccountId: accountId })
        console.log(mrvDetails);
        return res.status(200).json(mrvDetails);
       
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

// Get emitter details by ID (for setting CC)
const getEmitterCCReqById = async(req, res) => {
    const accountId  = req.query.accountId;
    try {
  const emitterInfo = await Emitter.findOne({ accountId: accountId,isEmitter: true, allowableCarbonEmission: 0, allowableCarbonCredits: 0 });
  if(emitterInfo){
    return res.status(200).json(emitterInfo);
  }
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
    return res.status(404).json({message: "Either emitter not found or the account ID isn't an emitter or it's CC allowance request already been approved"});
 
}

// Get by ID all emitter details who are eligible for paybackCC 
const getPaybackCCReqById = async(req, res) => {
    const accountId  = req.query.accountId;
    try {
        const mrvList = await MRV.find({emitterAccountId: accountId,allowableCarbonCredits:{$gt:0},allowableCarbonEmission:{$gt:0},paybackCC:0,carbonEmitted:{$gte:0}});
        // console.log(mrvList);
        if(mrvList.length==0){
            return res.status(404).json({message:"Emmiter not found"})
        }
        return res.status(200).json(mrvList);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
 
}
//get payback request details for all emitter in MRV Dshboard.............Updated
const getPaybackListReqestForAllEmitter = async(req,res) =>{
    try {
        const mrvList = await MRV.find({allowableCarbonCredits:{$gt:0},allowableCarbonEmission:{$gt:0},paybackCC:0,carbonEmitted:{$gte:0}});
        console.log(mrvList);
        return res.status(200).json(mrvList);
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
        
}
module.exports = {
    setCCallowance, setCCpayback, setCCallowanceToAllSortedEmitter, deleteAllmrv, getPaybackRequestDetailsByAllSortedEmitter, getEmitterCCReqById,
    setCCpaybackToAllSortedEmitter, getAllmrv, getAllEmitterBeforeCC, getCCallowanceRequestToAllSortedEmitter, getMRVDetailsByAccountId,
    getPaybackCCReqById,getPaybackListReqestForAllEmitter
};