const express = require("express");
const app=express();
require('dotenv').config();
const cors=require("cors");
const bodyParser=require("body-parser");
const port=process.env.PORT||3001;
const {connectToDb}=require("./DB/connection");
const { userRoutes } = require("./Routes/userRoutes");
const { authRoutes } = require("./Routes/authRoutes");
const { bankRoutes } = require("./Routes/bankRoutes");
const { profileRoutes } = require("./Routes/profileRoutes");
connectToDb();
app.use(cors());
app.use(bodyParser.json({limit:"5mb"}));
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true,limit:"5mb"}));
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/po",bankRoutes);
app.use("/api/v1/profile",profileRoutes);
// app.delete("/api/v1/po",bankRoutes);
if(process.env.NODE_ENV==="production"){
    app.use(express.static("myfirstapp/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'myfirstapp','build','index.html'));
    })
}
app.listen(port,()=>{
console.log(`server running on port ${port}`);
});

