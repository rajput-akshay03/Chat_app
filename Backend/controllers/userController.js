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
         if(!user)
         {
             console.log("akshay")
           return res.json({
                message:"user not found"
            })
         }
         if(await bcrypt.compare(password,user.password))
         {  
            const token =  jwt.sign({id:user.id},process.env.JWT_SECRET,
                {expiresIn:'30d'})
            res.json({
                _id:user._id,
                name:user.name,
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
const allUsers = async(req,res)=>{
    const keyword = req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{};
  const Users = await User.find(keyword).find({id:{$ne:req.user.id}})
 
   res.json(
    {
       Users
    }
   )
}
module.exports = {registerUser,authUser,allUsers}