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
       .sort({updatedAt:-1}).then(async(result)=>{
        result = await User.populate(result,{
          path:"latestMessage.sender",
          select:"name pic email"
        })
       });
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
module.exports = {accessChat,fetchchats};