const mongoose=require("mongoose");
const MongoClient=require('mongodb').MongoClient;
require('dotenv').config();

 const connectToDb= async ()=>{
    try{
        const URI=process.env.MONGODB_URI;
        mongoose.connect(
           URI
        );
       
        mongoose.connection.on("error",(error)=>{
            throw new Error(`unable to connect to database:${error}`);
        });
    }catch(error){
        throw new Error(`unable to connect to database:${error}`);
    }
};
module.exports={
    connectToDb
}