const mongoose =require("mongoose");

const emitterSchema=new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required:true
    },
    accountId:{
        type:String,
        unique: true,
        required:true
    },
    region:{
        type:String,
        enum:["IND","USA","UAE"],
        required:true
    },
    industryType:{
        type:String,
        enum:["IT","Manufacturing","Transportation","Automotive"],
        required:true
    },
    description:{
        type:String,
        required:true
        
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    isEmitter:{
        type:Boolean,
        default:false,
    },
    // ticketId:{
    //     type:String,
    //     unique:true,
    //     default:null
    // },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    allowableCarbonCredits:{
        type:Number,
        default:0
    },
    allowableCarbonEmission:{
        type:Number,
        default:0
    },
    remainingCC:{
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
    dueDate:{
        type:String,
        default:null
    },  
    isBuyer:{
     type:Boolean,
     default:false
    },
    isSeller:{
        type:Boolean,
        default:false
       },
       availableHbar:{
        type:Number,
        default:0
       }
    
    
});


module.exports=mongoose.model("Emitter", emitterSchema);