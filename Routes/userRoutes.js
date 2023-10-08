const express=require("express");
const { Users } = require("../Models/users");
const userRoutes=express.Router();
userRoutes.post("add-user-data",async(req,res)=>{
    const data=req.body;
    console.log(">>>>>>data",data);
    await Users.create(data);
    res.send({
        success : true,
        message:"Added user Successfully",
    });

});
userRoutes.get("/get-user-data",async(req,res)=>{
    const users=await Users.find();
    if(users){
        res.send({
            success:true,
            message:"Found user successfully",
            data:users,
        });
    }
    else{
        res.send({
            success:true,
            message:"No users found.",
        })
    }
})
module.exports={userRoutes};