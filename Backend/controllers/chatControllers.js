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
            { users:{$elemMatch:{$eq:req.user._id}}},
            { users:{$elemMatch:{$eq:req.userId}}}
        ],
      }).populate("users","-password").populate("latestMessage");
          isChat = await User.populate(isChat,{
            path:"latestMesaage.sender",
            select:"name pic email"
      })
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
module.exports = accessChat;