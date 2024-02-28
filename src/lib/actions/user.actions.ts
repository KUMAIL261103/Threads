"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.modal";
import { connecttoToDB } from "../mongoose"
//import mongoose from "mongoose";
export  async function updateuser (
    {
        userId,
        username,
        name,
        bio,
        profile_photo,
        path,
    }:{
    userId:string,
    username:string,
    name:string,
    bio:string,
    profile_photo:string,
    path:string}):Promise<void>{
    connecttoToDB();
    try{
         await User.findOneAndUpdate(
        {
            id:userId
        },
        {
            username:username.toLowerCase(),
            name,
            bio,
            image:profile_photo,
            onboarded:true,

        },
        {
            upsert:true,
        }
    );
    if(path==='/profile/edit'){
        revalidatePath(path);
    }

    }catch(error:any){
        throw new Error(`Failed to updated user ${error.message}`)
    }
   
}
export async function fetchuser(id:string){
    //console.log("this is the normal idd ",id);
    try{
        connecttoToDB();
        // const idd = new mongoose.Types.ObjectId(id);
        //console.log("this is the changed idd to object id", idd);
        //console.log("hhoo");
        const userinfo = await User.findOne({ id: id });
        
        // .populate(
        //     // {
        //     //     path:'communities',
        //     //     model:communityTabs,
        //     // }
            // );
           // console.log("heree",userinfo);
        return userinfo;

    }catch(error:any){
        console.log("error in fertching the user");
        throw new Error(`Failed to fetch a user : ${error.message}`)
    }
}