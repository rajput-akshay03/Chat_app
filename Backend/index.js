const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const cors = require('cors');
dotenv.config();
connectdb();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.listen(port, console.log(`running one ${port}`))
app.get('/',(req,res)=>{res.send(`running on ${port}`)})