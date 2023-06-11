const express=require("express");
const router=express.Router();

const {registerEmitter,getAllEmitters,getEmitterById,checkEmitterExistanceByAccId,
    deleteAllEmitters,getAllTicketList,getTicketById,deleteAllTicket,loginEmitter,carbonAllowanceRequestTkt,
    emitterAcceptPaybackReq}=require("../controllers/emitter-controller.js");



const {registerGovt,getGovtDetails,acceptEmitterRegistrationRequest,findUserRegisterDetails,rejectEmitterRegistrationRequest,
    acceptEmitterCCAllowanceRequest,paybackRequestToEmitter,freezeAccountByGovt, getEmitterDetailsRequestForCCFromMRVById,getPaybackDetailsRequestByGovtById,
    paybackRequestToEmitterByAcId,checkTokenBalance, getPaybackDetailsRequestByGovt, 
    getEmitterDetailsRequestForCCFromMRV}=require("../controllers/govt-controller.js");


 const {setCCallowance,setCCpayback,setCCallowanceToAllSortedEmitter,deleteAllmrv,getEmitterCCReqById, getMRVDetailsByAccountId, getPaybackRequestDetailsByAllSortedEmitter,
        getAllmrv,setCCpaybackToAllSortedEmitter,getCCallowanceRequestToAllSortedEmitter,getAllEmitterBeforeCC, getPaybackCCReqById,
        getPaybackListReqestForAllEmitter}=require("../controllers/mrv-controller.js");


//Routes for Emitter
router.route("/addEmitter").post(registerEmitter);
router.route("/getAllEmitter").get(getAllEmitters);
router.route("/getEmitterByAcId").get(getEmitterById);
router.route("/checkEmitterExistance").get(checkEmitterExistanceByAccId);
router.route("/loginEmitter").post(loginEmitter);

router.route("/deleteAllEmitters").delete(deleteAllEmitters);
router.route("/paybackReqAccepted").put(emitterAcceptPaybackReq);

router.route("/ccAllowanceReq").post(carbonAllowanceRequestTkt);

// Routes for Tickets
router.route("/getAllTickets").get(getAllTicketList);
router.route("/getTktById").get(getTicketById);
router.route("/deleteAllTicket").delete(deleteAllTicket);

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



module.exports=router;
