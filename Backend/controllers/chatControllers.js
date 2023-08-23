const Chat = require("../Models/chatModel")
const User = require("../Models/userModel")
const accessChat = async(req,res)=>{
      const {userId} = req.body;
      if(!userId)
      {
        console.log("not having id");
        return res.sendStatus(400);
      }
      console.log(req.user._id);
      var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            { users:{$elemMatch:{$eq:req.user.id}}},
            { users:{$elemMatch:{$eq:userId}}}
        ],
      }).populate("users","-password").populate("latestMessage");
          isChat = await User.populate(isChat,{
            path:"latestMesaage.sender",
            select:"name pic email"
      })
      console.log(isChat);
      if(isChat.length>0)
      {
        res.send(isChat[0]);
      }
      else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try{
              const createdChat = await Chat.create(chatData);
              const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password");
              res.status(200).send(FullChat);
        }
        catch(err)
        {
             res.status(400);
             throw new Error(err.message);
            //  console.log("error")
        }
      }
}
const fetchchats = async(req,res)=>{
  try{
   
      const result =  await Chat.find({users:{$elemMatch:{$eq:req.user.id}}})
     
       .populate("users","-password")
       .populate("groupAdmin","-password")
       .populate("latestMessage")
       .sort({updatedAt:-1})
      //  .then(async(result)=>{
      //   result = await User.populate(result,{
      //     path:"latestMessage.sender",
      //     select:"name pic email"
      //   })
      //  });
       res.send({
          result
       })
  }
  catch(err)
  {
    res.json({
      err:err.message
     })
  }
}
const createGroup = async(req,res)=>{
   if(!req.body.users||!req.body.name){
      return res.status(400).send({message:"fill all details"});
   }
   var users= JSON.parse(req.body.users);
   if(users.length<2)
   {
     return res.status(400).send("more than two users are required")
   }
   users.push(req.user);
   try{
    const groupchat =await Chat.create({
      chatName:req.body.name,
      users:users,
      isGroupChat:true,
      groupAdmin:req.user
     })
     console.log(groupchat)
     const fullgroup = await Chat.findOne({_id:groupchat._id})
     .populate("users","-password")
     .populate("groupAdmin","-password");
     res.json({fullgroup})
   }
   catch(err){
    res.json({err})
   }
   
}
const renameGroup = async(req,res)=>{
    const {chatId,chatName} = req.body;
    const updatedchat = await Chat.findByIdAndUpdate(chatId,{chatName},{new:true})
    .populate("users","-password").populate("groupAdmin","-password");
}
const addToGroup = async(req,res)=>{
    const {chatId,userId} = req.body;
  const added = await Chat.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true})
  .populate("users","-password").populate("groupAdmin","-password");
  if(!add)
  {
    res.status(400);
    res.send("no chat found");
  }
  else{
    res.json({
      added
    })
  }
}
const removeFromGroup = async(req,res)=>{
  const {chatId,userId} = req.body;
const deleted = await Chat.findByIdAndDelete(chatId,{$pull :{users:userId}},{new:true})
.populate("users","-password").populate("groupAdmin","-password");
if(!deleted)
{
  res.status(400);
  res.send("no chat found");
}
else{
  res.json({
    deleted
  })
}
}
module.exports = {accessChat,fetchchats,createGroup,renameGroup,addToGroup,removeFromGroup};