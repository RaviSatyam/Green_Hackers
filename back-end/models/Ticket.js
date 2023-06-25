const mongoose =require("mongoose");

const ticketSchema=new mongoose.Schema({
    ticketId:{
        type: String,
        unique:true
    },
    accountId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    raisedBy:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","completed"]
    },
    motive:{
        type:String,
        enum:["eVerification","carbonAllowance","payback"],
        required:true
    },
    closedAt:{
        type:Date,
        default:null
    }
    
    
});

module.exports=mongoose.model("Ticket", ticketSchema);