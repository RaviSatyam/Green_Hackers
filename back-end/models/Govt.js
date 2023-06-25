const mongoose=require("mongoose");

const govtSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    accountId:{
        type:String,
        unique:[true,"This accountId already exist!"],
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isGovernment:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }

});
module.exports=mongoose.model("Government",govtSchema);