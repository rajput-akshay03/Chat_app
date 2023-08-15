const mongoose = require("mongoose");
const connectdb = async()=>{
    try{
            const conn = await mongoose.connect(process.env.MONGODB_URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true   
            })
            console.log("mongodb connected")
    }
    catch(err)
    {
           console.log(err);
           process.exit();
    }
} 
module.exports = connectdb;
