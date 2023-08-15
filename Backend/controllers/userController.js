const User = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config();
const registerUser = async(req,res)=>{
    try{
        const {name,email,password,pic} = req.body;
        if(!name ||!email||!password)
        {
            res.status(400);
            throw new Error("fill all details")
        }
       
            const userExists = await User.findOne({email});
       if (userExists)
       { 
        res.status(400);
        throw new Error("user already exists")
       }
       const hashpassword =await bcrypt.hash(password,10);
       const user = await User.create({
        name,
        email,
        password:hashpassword,
        pic
       })
       const token =  jwt.sign({id:user.id},process.env.JWT_SECRET,
        {expiresIn:'30d'})  
       res.status(200).json({
        message:"user created succesffully",
        data:user,
        token
       })

    }
    catch(err)
    { 
        console.log(err)
       res.status(400).json({
        message:"error while creating user"
       })
    }
}
const authUser = async(req,res)=>{
    try{
         const {email,password} = req.body;
         const user = await User.findOne({email});
         if(await bcrypt.compare(password,user.password))
         {  
            const token =  jwt.sign({id:user.id},process.env.JWT_SECRET,
                {expiresIn:'30d'})
            res.json({
                _id:user._id,
                name:user.Name,
                email:user.email,
                pic:user.pic,
                token:token
            })

         }
         else{
            res.json({

                message:"password not matched"
            })
         }
    }
    catch(err)
    {    
        console.log(err)
          res.json({
            message:"not logged in"
          })
    }
}
module.exports = {registerUser,authUser}