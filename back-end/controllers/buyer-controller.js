//importing utils-sdk
const utilsSdk = require("../hedera-utils/utils-sdk");

const Emitter = require("../models/Emitters");
// const Govt = require("../models/Govt");
const Ticket = require("../models/Ticket");
const utils = require("../hedera-utils/utils");
const MRV = require("../models/mrv");
const { PrivateKey } = require("@hashgraph/sdk");
const Buyers = require("../models/Buyer");
const Seller = require("../models/Seller");
require("dotenv").config({ path: "../../.env" });
//1 CC = 12 HBAR
//POST API for BUYER Entry in primary market
const addBuyerEntryInPrimaryMarket = async (req, res) => {
    const { accountId } = req.body;
    try {
        // console.log("Finding accoount Id In emitter schema");
        const emitterList = await Emitter.findOne({ accountId: accountId, isSeller: false, isEmitter: true });
        const buyerList = await Buyers.findOne({accountId: accountId});
        // console.log("Emitter found: " + emitterList);
        if (!emitterList) {
            return res.status(404).send({ message: "User not exists.or may be already a seller" });
        }
        if (buyerList) {
            return res.status(404).send({ message: "Buyer already exists." });
        }
        // have to change 12 to 2hbar
        else if (emitterList.availableHbar >= 2) {
            //    console.log("Avaiable Hbar", emitterList.availableHbar);
            const buyer = new Buyers({
                name: emitterList.name,
                accountId: emitterList.accountId,
                availableHbar: emitterList.availableHbar,
                remainingCC: emitterList.remainingCC,
                selectedSellerId: null
            });
            // console.log("Buyer obj: " + buyer);
            await buyer.save();
            console.log(buyer.selectedSellerId);
            //console.log(buyer.name);
            const e = await Emitter.findOneAndUpdate({ accountId: accountId }, { isBuyer: true });
            //  console.log("Buyer saved successfully");
            return res.status(200).json({ message: "Successfully added the Buyer" });
        } else {
            return res.status(404).json({ message: "Insufficient HBAR Balance to become buyer" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server Error" });
    }
}
// GET API for all BuyerList
const getAllBuyerList = async (req, res) => {
    try {
        const buyersList = await Emitter.find({ isBuyer: true })
        // const sellersList = await Seller.find();
        return res.status(200).json(buyersList);
    } catch (error) {
        return res.status(404).json({ message: "BuyerList not Found" });
    }
}
//GET All API using buyer schema
const getAllBuyerSchema = async (req, res) => {
    try {
        const buyersList = await Buyers.find();
        console.log(buyersList);
        // const sellersList = await Seller.find();
        return res.status(200).json(buyersList);
    } catch (error) {
        return res.status(404).json({ message: "BuyerList not Found" });
    }
}
// GET API for by Id
const getBuyerById = async (req, res) => {
    try {
        const accountId = req.query.accountId;
        const buyerList = await Emitter.findOne({ accountId: accountId, isBuyer: true })
        // const sellersList = await Seller.find();
        return res.status(200).json(buyerList);
    } catch (error) {
        return res.status(404).json({ message: "BuyerList not Found" });
    }
}

//POST API for Intrested to buy Carbon Credits

const expressInterestToBuy = async (req, res) => {
    try {
        const { sellerId, buyerId, amountOfTokenBuy } = req.body;
        // 1 CC=2 HBAR Taking for demo purpose
        const HbarRequiredToBuy = amountOfTokenBuy * 2;
        console.log(HbarRequiredToBuy);
        const seller = await Seller.findOne({ accountId: sellerId });
        console.log(seller);
        const buyer = await Buyers.findOne({ accountId: buyerId });
        console.log(buyer);
        if (!seller) {
            return res.status(404).json({ message: "Seller not Found" });
        }
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not Found" });
        }
        if (seller.amountOfTokenSell >= amountOfTokenBuy && buyer.availableHbar > HbarRequiredToBuy) {
            console.log("working if conditions");
            const buyers = await Buyers.findOneAndUpdate({ accountId: buyerId }, { amountOfTokenBuy: amountOfTokenBuy, wishToBuy: true, selectedSellerId: sellerId });
            console.log(buyers);
            return res.status(200).json({ message: "Successfully Expressed Interest in buying " })
        }
        return res.status(400).json({ message: "Insufficient token balance" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Servor error" })
    }
    //return res.status(500).json({message:"Failed Attempt"});
}

const deleteAllBuyer = async (req, res) => {
    try {
        const buyer = await Buyers.deleteMany({});
        return res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "failed to delete!" });
    }
}





module.exports = {
    addBuyerEntryInPrimaryMarket, getAllBuyerList, getBuyerById, expressInterestToBuy, getAllBuyerSchema, deleteAllBuyer
};
