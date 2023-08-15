const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const userRoutes = require("./routes/userRoutes")
dotenv.config();
connectdb();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/api/user',userRoutes);
app.listen(port, console.log(`running one ${port}`))
app.get('/',(req,res)=>{res.send(`running on ${port}`)})