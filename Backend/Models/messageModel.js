const mongoose = require("mongoose");
const messageModel =new mongoose.Schema({
      sender:{
        type:mongoose.Schema.types.ObjectId,
        ref:"User"
      },
      content:{
        type:String,
        trim:true
      },
      chat:{
        type:mongoose.Schema.types.ObjectId,
        ref:"Chat"
      }
},
  {
    timestamps:true
  }
)
module.exports = mongoose.model("message",messageModel);