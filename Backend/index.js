const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const cors = require('cors');
dotenv.config();
connectdb();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
const server = app.listen(port, console.log(`running one ${port}`))
const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
});
io.on("connection",(socket)=>{
    console.log("connectd to socket.io");
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    })
    socket.on("join chat",(room)=>{
        socket.join(room);
    })
    socket.on("newMessage",(newMessageRecieved)=>{
        console.log("hello")
        var chat = newMessageRecieved.message.chat;
        if (!chat.users) return console.log("user not found");
        chat.users.forEach((user) => { 
             if(user._id==newMessageRecieved.message.sender._id)  return;
                //   socket.in(user._id).emit("message recieved",newMessageRecieved.message.chat)
                socket.in(user._id).emit("message recieved",newMessageRecieved.message)
        });
    })
    socket.on("typing",(room)=>{socket.in(room).emit("typing")})
    socket.on("stop typing",(room)=>{socket.in(room).emit("stop typing")})
})
app.get('/',(req,res)=>{res.send(`running on ${port}`)})