const express=require("express");
const router=express.Router();

const {registerEmitter,getAllEmitters,getEmitterById,checkEmitterExistanceByAccId,
    deleteAllEmitters,getAllTicketList,getTicketById,deleteAllTicket,loginEmitter
}=require("../controllers/emitter-controller.js");



const {registerGovt,getGovtDetails,acceptEmitterRegistrationRequest,findUserRegisterDetails,rejectEmitterRegistrationRequest,
    acceptEmitterCCAllowanceRequest,paybackRequestToEmitter,freezeAccountByGovt, getEmitterDetailsRequestForCCFromMRVById,getPaybackDetailsRequestByGovtById,
    paybackRequestToEmitterByAcId,checkTokenBalance, getPaybackDetailsRequestByGovt, 
    getEmitterDetailsRequestForCCFromMRV}=require("../controllers/govt-controller.js");
    

//Routes for Emitter
router.route("/addEmitter").post(registerEmitter);
router.route("/getAllEmitter").get(getAllEmitters);
router.route("/getEmitterByAcId").get(getEmitterById);
router.route("/checkEmitterExistance").get(checkEmitterExistanceByAccId);
router.route("/loginEmitter").post(loginEmitter);

router.route("/deleteAllEmitters").delete(deleteAllEmitters);

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


module.exports=router;