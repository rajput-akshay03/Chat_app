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
        default:"https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
    },
},
   {
    timestamps:true
   }
)
module.exports = mongoose.model("User",userSchema);