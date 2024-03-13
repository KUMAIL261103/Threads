"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.modal";
import Thread from "../models/thread.model"
import { connecttoToDB } from "../mongoose"
import { ObjectId } from "mongodb";
import mongoose, { FilterQuery, SortOrder } from "mongoose";
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
export async function fetchUserPosts(accountId: typeof mongoose.Schema.ObjectId){
    try{
        //console.log(accountId);
        const threads = await User.findById(accountId)
        .populate(
            {   path:"threads",
                model:"Thread",
                populate:
                {   path:"children",
                    model:"Thread",
                    populate:
                    {   path:"author",
                        model:"User",
                        select:"image username name id"}}}).exec();
       // console.log(threads);
        //return threads;
       // const threads = await User.findById(accountId).populate({path:'threads',model:'Thread'});
        return threads;
    }catch(err:any){
            console.log("actionss error");
             throw new Error(err);
    }
}
export async function fetchUserPostsreplies(accountId: typeof mongoose.Schema.ObjectId){
    try{
        //console.log(accountId);
        const info = await User.findById(accountId)
        .populate(
            {   path:"threads",
                model:"Thread",
                populate:
                {   path:"children",
                    model:"Thread",
                    populate:
                    {   path:"author",
                        model:"User",
                        select:"image username name id"}}}).exec();
        //console.log("this is  my info ....",info);
        if(info && info.threads){

             info.threads = info.threads.filter((thread:any)=>thread.parentId!==undefined);          
        }
        //  const threads = await User.findById(accountId).populate('threads');
        // return threads;
        
        //console.log("this is updated info ",info);
        return info;
        // return reqarr;
        // const threads = await User.findById(accountId).populate('threads');
        // return threads;
    }catch(err:any){
            console.log("actionss error");
             throw new Error(err.message);
    }
}
export async function fetchUserPostsLiked(accountId: typeof mongoose.Schema.ObjectId){
    try{
        //console.log(accountId);
        const info = await User.findById(accountId)
        .populate(
            {   path:"likedthread",
                model:"Thread",
                populate:
                {   path:"children",
                    model:"Thread",
                    populate:
                    {   path:"author",
                        model:"User",
                        select:"image username name id"}}}).exec();
     // console.log(info);
      return info;
    //  const threads = await User.findById(accountId).populate('threads');
    //     return threads;
        //console.log(threads);
        //return threads;
        // const threads = await User.findById(accountId).populate('threads');
        // return threads;
    }catch(err:any){
            console.log("actionss error");
             throw new Error(err.message);
    }
}
export async function fetchAllUsers(
    {
        userId,
        searchString="",
        pageNumber=1,
        pageSize=10,
        sortby="desc"

    }:{
        userId:any,
        searchString?:string,
        pageNumber?:number,
        pageSize?:number,
        sortby?:SortOrder
    }
){
    try{
        // connecttoToDB();
        // const data = await User.find(
        // {$ne : {id:userId}},
        // ).select('_id id name username image bio');
        // return data;
        //console.log("this is the user id",userId);
        connecttoToDB();
        const skipUsers:number = (pageNumber-1)*pageSize;
        const regex = new RegExp(searchString,'i');
        const query:FilterQuery<typeof User> = {
           _id: { $ne: new mongoose.Types.ObjectId(userId) }

        }
        if(searchString!=""){
            query.$or = [
                {name:regex},
                {username:regex},
            ]
        }
        //const sortedOpt = {createdAt:sortby}
        //const reqUsers = (await User.find(qu  ery)).sort(sortedOpt).skip(skipUsers).limit(pageSize);
        const reqUsers =  User.find(query).sort({ createdAt: sortby }).skip(skipUsers).limit(pageSize);
        const totalUsers = await User.countDocuments(query);
        const users = await reqUsers.exec();
        const isNext = totalUsers > skipUsers + users.length;
        return {users,isNext};
    }catch(err:any){
        console.log(err);
        throw  new Error(err.message);
    }
}
export async function getActivity(userId:string){
    try{
        connecttoToDB();
        const userthreads  = await Thread.find({author:userId});
        const comments = userthreads.reduce((acc:any,thread:any)=>{
            return acc.concat(thread.children);
        },[]);
        const repliesExceptUser = await Thread.find({_id:{$in:comments},author:{$ne:userId}}).populate({path:'author',model:'User',select:'image username name id _id'});
        return repliesExceptUser;

    
    }catch(err:any){
        throw new Error(err.message);
    }
}