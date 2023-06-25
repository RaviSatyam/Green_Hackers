const mongoose =require("mongoose");

const buyerSchema=new mongoose.Schema({
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
    minBalHbar:{
        type:Number,
        default:0
    },

   amountOfTokenBuy:{
     type:Number,
     default:0
   },
   wishToBuy:{
    type:Boolean,
    default:0
   },
   selectedSellerId:{
    type:String,
    unique:true,
    dafault:null
   }
});


module.exports=mongoose.model("Buyer",buyerSchema);