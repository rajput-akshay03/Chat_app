const Message = require("../Models/messageModel")
const User = require("../Models/userModel")
const Chat = require("../Models/chatModel")
const sendMessage = async(req,res)=>{
         const {content,chatId} = req.body;
         console.log(req.user.id)
         if(!content||!chatId)
         {
            console.log("invalid data passed");
            return res.status(400);
         }
         var newMessage = {
            sender:req.user.id,
            content:content,
            chat:chatId
         }
         try{
            var message = await Message.create(newMessage);
            message = await message.populate("sender", "name pic")
            message = await message.populate({
               path: "chat",
               populate: {
                   path: "users",
                   select: "name pic email"
               }
           })
           await Chat.findByIdAndUpdate(chatId,{
            latestMessage:message
           });
           res.json({message})
         }
         catch(err)
         {
            res.status(400);
           console.log(err)
         }
}
const allMessages = async(req,res)=>{
   try{
        const messages = await Message.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat");
        res.json(messages)

   }
   catch(err)
   {
         res.send(err)
   }
}
module.exports = {sendMessage,allMessages};