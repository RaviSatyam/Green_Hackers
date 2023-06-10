const express=require("express");
const router=express.Router();

const {registerEmitter,getAllEmitters,getEmitterById,checkEmitterExistanceByAccId,
    deleteAllEmitters,getAllTicketList,getTicketById,deleteAllTicket,loginEmitter
}=require("../controllers/emitter-controller.js");


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


module.exports=router;
