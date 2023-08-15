const mongoose = require("mongoose");
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
    },
},
   {
    timestamps:true
   }
)
module.exports = mongoose.model("User",userSchema);