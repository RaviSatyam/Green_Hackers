const mongoose =require("mongoose");

const mrvSchema=new mongoose.Schema({
    
    emitterAccountId:{
        type:String,
        unique: true
    },
    allowableCarbonCredits:{
        type:Number,
        default:0
    },
    allowableCarbonEmission:{
        type:Number,
        default:0
    },
    paybackCC:{
        type:Number,
        default:0
    },
    carbonEmitted:{
        type:Number,
        default:0
    },
    dueDate: {
        type:String,
        default:null
    }
    
    
});


module.exports=mongoose.model("mrv", mrvSchema);