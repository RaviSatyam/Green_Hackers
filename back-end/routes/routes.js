const express=require("express");
const router=express.Router();

const {registerEmitter,getAllEmitters,getEmitterById,checkEmitterExistanceByAccId,carbonAllowanceRequestTkt,
    deleteAllEmitters,getAllTicketList,getTicketById,deleteAllTicket,loginEmitter,emitterAcceptPaybackReq
}=require("../controllers/emitter-controller.js");

const {registerGovt,getGovtDetails,acceptEmitterRegistrationRequest,findUserRegisterDetails,rejectEmitterRegistrationRequest,
    acceptEmitterCCAllowanceRequest,paybackRequestToEmitter,freezeAccountByGovt, getEmitterDetailsRequestForCCFromMRVById,getPaybackDetailsRequestByGovtById,
    paybackRequestToEmitterByAcId,checkTokenBalance, getPaybackDetailsRequestByGovt, getEmitterDetailsRequestForCCFromMRV}=require("../controllers/govt-controller.js");

const {setCCallowance,setCCpayback,setCCallowanceToAllSortedEmitter,deleteAllmrv,getEmitterCCReqById, getMRVDetailsByAccountId, getPaybackRequestDetailsByAllSortedEmitter,
    getAllmrv,setCCpaybackToAllSortedEmitter,getCCallowanceRequestToAllSortedEmitter,getAllEmitterBeforeCC, getPaybackCCReqById,
    getPaybackListReqestForAllEmitter}=require("../controllers/mrv-controller.js");

    //Primary Market for buyer
    const{addBuyerEntryInPrimaryMarket,getAllBuyerList,getBuyerById,expressInterestToBuy,getAllBuyerSchema,deleteAllBuyer}=require("../controllers/buyer-controller.js");

// primary Market for seller

const{addSellerEntryPrimaryMarket,getAllSellerList,getSellerById,getInterestedBuyerList,approveTransaction,rejectBuyerTransaction,deleteAllSeller,checkSellerAlreadyExist}=require("../controllers/seller-controller.js")
    // routes for emitter
router.route("/addEmitter").post(registerEmitter);
router.route("/getAllEmitter").get(getAllEmitters);
router.route("/getEmitterByAcId").get(getEmitterById);
router.route("/checkEmitterExistance").get(checkEmitterExistanceByAccId);
router.route("/loginEmitter").post(loginEmitter);
router.route("/paybackReqAccepted").put(emitterAcceptPaybackReq);

// routes for carbon allowance request
router.route("/ccAllowanceReq").post(carbonAllowanceRequestTkt);

// routes for delete all emitters
router.route("/deleteAllEmitters").delete(deleteAllEmitters);

// routes for government
router.route("/addGovt").post(registerGovt);
router.route("/findUserRegisterDetails").get(findUserRegisterDetails);
router.route("/getGovtDetails").get(getGovtDetails);
router.route("/acceptEmitterRegReq").put(acceptEmitterRegistrationRequest);
router.route("/rejectEmitterRegReq").delete(rejectEmitterRegistrationRequest);
router.route("/acceptCCallowance").put(acceptEmitterCCAllowanceRequest);
router.route("/paybackReqToAllEmitter").put(paybackRequestToEmitter);
router.route("/paybackReqToEmitterByAcId").put(paybackRequestToEmitterByAcId);
router.route("/freezeAccountByGovt").get(freezeAccountByGovt);
router.route("/tokenBal").get(checkTokenBalance);
router.route("/getPaybackDetailsRequestByGovt").get(getPaybackDetailsRequestByGovt);
router.route("/getEmitterDetailsRequestForCCFromMRV").get(getEmitterDetailsRequestForCCFromMRV);
router.route("/getEmitterDetailsRequestForCCFromMRVById").get(getEmitterDetailsRequestForCCFromMRVById);
router.route("/getPaybackDetailsRequestByGovtById").get(getPaybackDetailsRequestByGovtById);

// routes for ticket
router.route("/getAllTickets").get(getAllTicketList);
router.route("/getTktById").get(getTicketById);
router.route("/deleteAllTicket").delete(deleteAllTicket);

// routes for MRV
router.route("/setCCallowance").put(setCCallowance);
router.route("/setCCpayback").put(setCCpayback);
router.route("/getAllEmitterBeforeCC").get(getAllEmitterBeforeCC);
router.route("/setCCForAllSortedEmitter").put(setCCallowanceToAllSortedEmitter);
router.route("/getPaybackRequestDetailsByAllSortedEmitter").get(getPaybackRequestDetailsByAllSortedEmitter);
router.route("/deleteAllmrv").delete(deleteAllmrv);
router.route("/getAllmrvList").get(getAllmrv);
router.route("/setCCpaybackForAllSortedEmitter").put(setCCpaybackToAllSortedEmitter);
router.route("/getCCallowanceRequestToAllSortedEmitter").get(getCCallowanceRequestToAllSortedEmitter);
router.route("/getMRVDetailsByAccountId").get(getMRVDetailsByAccountId);
router.route("/getEmitterCCReqById").get(getEmitterCCReqById);
router.route("/getPaybackCCReqById").get(getPaybackCCReqById);
router.route("/getPaybackListReqestForAllEmitter").get(getPaybackListReqestForAllEmitter);

// routes for Buyer
router.route("/addBuyerEntryInPrimaryMarket").post(addBuyerEntryInPrimaryMarket);
router.route("/getAllBuyerList").get(getAllBuyerList);
router.route("/getBuyerById").get(getBuyerById);
router.route("/expressInterestToBuy").post(expressInterestToBuy);
router.route("/deleteAllBuyer").delete(deleteAllBuyer);

//routes for Seller
router.route("/addSellerEntryPrimaryMarket").post(addSellerEntryPrimaryMarket);
router.route("/getAllSellerList").get(getAllSellerList);
router.route("/getSellerById").get(getSellerById);
router.route("/getInterestedBuyerList").get(getInterestedBuyerList);
router.route("/getAllBuyerSchema").get(getAllBuyerSchema);
router.route("/approveTransaction").put(approveTransaction);
router.route("/rejectBuyerTransaction").put(rejectBuyerTransaction);
router.route("/deleteAllSeller").delete(deleteAllSeller);
router.route("/checkSellerAlreadyExist").post(checkSellerAlreadyExist);
module.exports=router;


