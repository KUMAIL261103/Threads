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
export const fetchThreads = async(pageNO= 1, pageSize=20)=>{
    connecttoToDB();
    try{
        const skipthreads = (pageNO-1)*pageSize;
    const threads = await Thread.find({parentId:{$in:[ null || undefined]}})
    .sort({createdAt:'desc'})
    .skip(skipthreads)
    .limit(pageSize)
    .populate({path:'author', model:User})
    .populate(
    {   path:'children',
        populate:{
            path:'author',
            model:User,
            select: '_id id name username parentId image createdAt'
        }
    }).exec()
    const totalthreads  = await Thread.countDocuments({parentId:{$in:[ null || undefined]}});
    // const threadsresult = await threads.exec();
    const isNextPage = totalthreads > skipthreads+threads.length;
    if(threads==null ){
        console.log("no threads are there");
        return {};
    }
    return {threads,isNextPage};
}catch(error:any){
    console.log("the error occureed in fetching all threads");
    throw new Error(error);
}
}