const mongoose =require("mongoose");

const sellerSchema=new mongoose.Schema({
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
    availableHbar:{
        type:Number,
        default:0
    },
    remainingCC:{
        type:Number,
        default:0
    },
   amountOfTokenSell:{
     type:Number,
     default:0
   },
   wishToSell:{
    type:Boolean,
    default:0
   }
});


module.exports=mongoose.model("Seller",sellerSchema);