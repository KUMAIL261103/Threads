"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.modal";
import { connecttoToDB } from "../mongoose"
// import mongoose from "mongoose";
import Thread from "../models/thread.model";
interface Props{
    text:string,
    author:string,
    communityId:string |null,
    // threadId:string ,
    path:string
}
export const createThread = async({text,author,communityId
    // ,threadId
    ,path}:Props)=>{
    // console.log(thread);
    // console.log(userId);
    connecttoToDB();
    try{
        const createThread = await Thread.create({
        text,
        author,
        community: communityId || null,
    });
    const userr = await User.findByIdAndUpdate(author,
        {$push:{
            threads:createThread._id,
        }})
    //console.log(userr);
    revalidatePath(path);

    }catch(error:any){
        console.log("error occured in creation of thread");
        throw new Error(error);
    }
    
}