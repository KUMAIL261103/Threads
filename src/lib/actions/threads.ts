"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.modal";
import { connecttoToDB } from "../mongoose"
// import mongoose from "mongoose";
import Community from "../models/community";
import Thread from "../models/thread.model";

import mongoose from "mongoose";
interface Props{
    text:string,
    author:string,
    communityId:string | null,
    // threadId:string ,
    path:string
}
export const createThread = async({text,author,communityId
    // ,threadId
    ,path}:Props)=>{
    // console.log(thread);
    // console.log(userId);
    // console.log( "this is text "   ,text);
    // console.log("this is author ", author);
    // console.log("this is community id ", communityId);
    // console.log("this is path", path);
    connecttoToDB();
    try{
        const createThread = await Thread.create({
        text,
        author,
        community: communityId!=null ?new mongoose.Types.ObjectId(communityId) : null,
    });
    const userr = await User.findByIdAndUpdate(author,
        {$push:{
            threads:createThread._id,
        }})
    if(communityId){
       const communityupdate  = await Community.findByIdAndUpdate(communityId,{
        $push:{
            threads:createThread._id,
        }
       })
    }
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
        const threads = await Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipthreads)
    .limit(pageSize)
    .populate({ path: 'author', model: User, select : " id _id name username image" })
    .populate({path:'community',model:Community, select:"id name username image"})
    .populate({
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: '_id id name username parentId image createdAt'
        }
    })
    .exec();
    // const threads = await Thread.find({parentId:{$in:[ null || undefined]}})
    // .sort({createdAt:'desc'})
    // .skip(skipthreads)
    // .limit(pageSize)
    // .populate({path:'author', model:User, populate:{path:'communities',model:Community, select:"id name image"}})
    // .populate(
    // {   path:'children',
    //     populate:{
    //         path:'author',
    //         model:User,
    //         select: '_id id name username parentId image createdAt'
    //     }
    // }).exec()
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
export const fetchThreadById = async({id}:{id:string})=>{
    connecttoToDB();
    try{
     const thread = await Thread.findById(id).populate({path:'author',model:User,select:'image username id _id'})
     .populate(
        {
            path:'children',
            model:Thread,
            populate:[
               {
                path:'author',
                model:User,
                select:'id _id username image',
               },
               {
                path:'children',
                model:Thread,
                populate:{
                    path:'author',
                    model:User,
                    select:'id _id username image',
                }
               }

            ]


    }).exec();
     return thread;

    }catch(err:any){
        console.log("this is error of fetching thread by id");
        throw new Error(err);

    }
}
export const addComment = async(threadId:string, comment:string,userId:string,path:string)=>{
    connecttoToDB();
    try{
      
        
       // console.log(userId);
        const mainthreasd = await Thread.findById(new mongoose.Types.ObjectId(threadId));
        
        if(!mainthreasd){
            throw new Error("The thread not found");
        }
        // console.log(userId);
        // console.log(typeof(userId));
        //const newuserId = new mongoose.Types.ObjectId(userId);
        const userinfo = await User.findOne({id:userId});
        const newcomment = new Thread({
            text:comment,
            author:userinfo._id,
            parentId:new mongoose.Types.ObjectId(threadId),
            createdAt:Date.now(),
        })
        const savecomment = await newcomment.save();
        //console.log(savecomment);
        mainthreasd.children.push(savecomment._id);
        userinfo.threads.push(savecomment._id);
        await userinfo.save();
        await mainthreasd.save();
        revalidatePath(path);
    }catch(error:any){
        throw new Error(`this is the issue in creating the comment - ${error}`);
    }
}