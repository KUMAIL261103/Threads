import mongoose from "mongoose";
let isConneted = false;
export const connecttoToDB = async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URL)return console.log("Mongodb url not found");
    if(isConneted) return console.log("Already connected to MongoDB");
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        isConneted=true;
        console.log("Connected to Db");
    }catch(error){
        console.log(error);
    }
}