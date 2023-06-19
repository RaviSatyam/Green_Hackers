//importing utils-sdk
const utilsSdk = require("../hedera-utils/utils-sdk");

const Emitter = require("../models/Emitters");
// const Govt = require("../models/Govt");
const Ticket = require("../models/Ticket");
const utils = require("../hedera-utils/utils");
const MRV = require("../models/mrv");
const { PrivateKey } = require("@hashgraph/sdk");
const Buyer = require("../models/Buyer");
const Seller = require("../models/Seller");
require("dotenv").config({ path: "../.env" });
//1 CC = 12 HBAR
// Min cc should be 2CC for seller if seller sell 2cc then seller will gain 24HBAR(12HBAR*2CC)

//POST API for SELLER Entry in primary market
const addSellerEntryPrimaryMarket = async (req, res) => {
    const { accountId, amountOfTokenSell } = req.body
    const minCC = 5;
    try {
        // console.log("Finding accoount Id In emitter schema");
        const emitterList = await Emitter.findOne({ accountId: accountId, isBuyer: false, isEmitter: true });
        const sellerList = await Seller.findOne({accountId: accountId});
        // console.log("Emitter found: " + emitterList);
        if (!emitterList) {
            return res.status(404).send({ message: "User not exists.or may be already a buyer" });
        }
        else if(sellerList){
            return res.status(404).send({ message: "Seller Already exists" });  
        }
        else if (amountOfTokenSell > emitterList.remainingCC) { return res.status(500).json({ message: "You don't have enough tokens to sell" }) }
        else if (emitterList.paybackCC == 0 && emitterList.remainingCC >= minCC && emitterList.allowableCarbonCredits > 0 && emitterList.allowableCarbonEmission > 0 && amountOfTokenSell <= emitterList.remainingCC) {
            //    console.log("Avaiable Hbar", emitterList.availableHbar);
            const seller = new Seller({
                name: emitterList.name,
                accountId: emitterList.accountId,
                availableHbar: emitterList.availableHbar,
                remainingCC: emitterList.remainingCC,
                amountOfTokenSell: amountOfTokenSell,
                wishToSell: true
            });
            // console.log("Buyer obj: " + buyer);
            await seller.save();
            //console.log(buyer.name);
            const e = await Emitter.findOneAndUpdate({ accountId: accountId }, { isSeller: true });
            //  console.log("Buyer saved successfully");
            return res.status(200).json({ message: "Successfully added the Seller" });
        }
        return res.status(400).json({ message: "conditions not met to become a seller" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server Error" });
    }
}

// POST API Seller Exist
const checkSellerAlreadyExist=async(req,res)=>{
    const { accountId } = req.body
    const sellerList = await Seller.findOne({accountId: accountId});
    try{
    if(sellerList&&sellerList.amountOfTokenSell>0){
        return res.status(404).send({ message: "Seller have already Available Token to sell" });
    }
    else if(sellerList.amountOfTokenSell==0){
        const seller = await Seller.deleteMany({});
        return res.status(200).send({message: "Pls first add Seller in Primary Market"});
    }
}catch (err) {
    return res.status(500).json({ message: "Internal server Error" });
}
}
// GET API for all sellerList
const getAllSellerList = async (req, res) => {
    try {
        const sellersList = await Emitter.find({ isSeller: true })
        // const sellersList = await Seller.find();
        return res.status(200).json(sellersList);
    } catch (error) {
        return res.status(404).json({ message: "sellerList not Found" });
    }
}
// GET API for by Id
const getSellerById = async (req, res) => {
    try {
        const accountId = req.query.accountId;
        //const sellersList = await Emitter.findOne({ accountId: accountId, isSeller: true })
        const sellersList = await Seller.findOne({ accountId: accountId });
        return res.status(200).json(sellersList);
    } catch (error) {
        return res.status(404).json({ message: "sellerList not Found" });
    }
}
//GET API Interest for BUY CC on the Seller Portal
const getInterestedBuyerList = async (req, res) => {
    try {
        const sellerId = req.query.sellerId;
        const seller = await Seller.findOne({ accountId: sellerId });
        console.log(seller);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        const buyers = await Buyer.find({ selectedSellerId: sellerId });
        console.log(buyers);
        return res.status(200).json({ buyers });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//PUT API for  Atomic Swap transaction

const approveTransaction = async (req, res) => {
    try {
        const { sellerId, buyerId } = req.body;
        console.log(sellerId);
        console.log(buyerId);
        const buyer = await Buyer.findOne({ accountId: buyerId });
        const seller = await Seller.findOne({ accountId: sellerId });
       
        console.log(seller);
        console.log(buyer);
        if (!buyer || !seller) { return res.status(404).json({ message: "Either Buyer or Seller not found" }); }

        const x = buyer.amountOfTokenBuy;
        console.log(x);
        const amtOfHbarToPay = x * 2;
        const buyerHbarBalance = parseFloat((await utilsSdk.checkHbarBal(buyerId)));
        // const buyerTokenBalance = parseFloat((await utilsSdk.balanceTokenQuery(buyerId)));
        const sellerHbarBalance = parseFloat((await utilsSdk.checkHbarBal(sellerId)));
        // const sellerTokenBalance = parseFloat((await utilsSdk.balanceTokenQuery(sellerId)));

        // console.log(buyerHbarBalance);
        // console.log(buyerTokenBalance);
        // console.log(sellerHbarBalance);
        // console.log(sellerTokenBalance);

        if(seller.amountOfTokenSell-x==0||seller.amountOfTokenSell==x){
            const transaction = await utilsSdk.atomicSwapTransaction(sellerId, buyerId, x, amtOfHbarToPay);
            const updatedSellerEmitterList = await Emitter.findOneAndUpdate({ accountId: sellerId, isSeller: true },
                {
                    remainingCC: sellerEmitter.remainingCC - x,
                    availableHbar: sellerHbarBalance,
                    isSeller: false
                })
             //   console.log(updatedSellerEmitterList);
                const deleteSeller = await Seller.findOneAndDelete({ accountId: sellerId });
            const updatedBuyerEmitterList = await Emitter.findOneAndUpdate({ accountId: buyerId, isBuyer: true },
                {
                    availableHbar: buyerHbarBalance,
                    remainingCC: buyerEmitter.remainingCC + x,
                    isBuyer: false

                })

            const deleteBuyer = await Buyer.findOneAndDelete({ accountId: buyerId });

        }
        else{
            const sellerEmitter=await Emitter.findOne({ accountId: sellerId});
            const transaction = await utilsSdk.atomicSwapTransaction(sellerId, buyerId, x, amtOfHbarToPay);
            const updatedSellerEmitterList = await Emitter.findOneAndUpdate({ accountId: sellerId, isSeller: true },
                {
                    remainingCC: sellerEmitter.remainingCC-x,
                    availableHbar: sellerHbarBalance

                })
              //  console.log(updatedSellerEmitterList);
                

            const UpdatedSellerList = await Seller.findOneAndUpdate({ accountId: sellerId },
                {
                    wishToSell: true,
                    availableHbar: sellerHbarBalance,   ///availableHbar + amtOfHbarToPay,
                    remainingCC: seller.remainingCC - x,
                    amountOfTokenSell: seller.amountOfTokenSell - x
                })
                console.log(UpdatedSellerList);
                const buyerEmitter=await Emitter.findOne({ accountId: buyerId});
            const updatedBuyerEmitterList = await Emitter.findOneAndUpdate({ accountId: buyerId, isBuyer: true },
                {
                    availableHbar: buyerHbarBalance,
                    remainingCC: buyerEmitter.remainingCC + x,
                    isBuyer: false

                })
            //    console.log(updatedBuyerEmitterList);
            const deleteBuyer = await Buyer.findOneAndDelete({ accountId: buyerId });

        }
        // const UpdatedBuyerList = await Buyer.findOneAndUpdate({ accountId: buyerId },
        //     {
        //         wishToBuy: false,
        //         availableHbar: buyerHbarBalance,    //availableHbar - amtOfHbarToPay,
        //         remainingCC: buyerTokenBalance,     // remainingCC + x,
        //         amountOfTokenBuy: 0,
        //         selectedSellerId: null
        //     })
        // console.log(UpdatedBuyerList);


        return res.status(200).json({ message: "Atomic swap transaction successfull & updated Seller, buyer,Emitter Schema" });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const rejectBuyerTransaction = async (req, res) => {
    try {
        const { sellerId, buyerId } = req.body;
        const buyer = await Buyer.findOne({ accountId: buyerId });
        const seller = await Seller.findOne({ accountId: sellerId });
        if (!seller) {
            return res.status(400).json({ message: "not seller found" });
        }
        if (!buyer) {
            return res.status(400).json({ message: "not buyer found" });
        }
        const updateBuyerList = await Buyer.findOneAndUpdate({ accountId: buyerId },
            {
                wishToBuy: false,
                selectedSellerId: null

            })
        return res.status(200).json({ message: "Atomic swap transaction rejected" });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const deleteAllSeller = async (req, res) => {
    try {
        const seller = await Seller.deleteMany({});
        return res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "failed to delete!" });
    }
}


module.exports = {
    addSellerEntryPrimaryMarket, getAllSellerList, getSellerById, getInterestedBuyerList, approveTransaction, rejectBuyerTransaction, deleteAllSeller,checkSellerAlreadyExist
};
