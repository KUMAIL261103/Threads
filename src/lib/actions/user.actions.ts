"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.modal";
import { connecttoToDB } from "../mongoose"
import mongoose, { SortOrder } from "mongoose";
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
        userId:string,
        searchString?:string,
        pageNumber?:number,
        pageSize?:number,
        sortby?:SortOrder
    }
){
    try{
        connecttoToDB();
        const data = await User.find().select('_id id name username image bio');
        return data;

    }catch(err:any){
        console.log(err);
        throw  new Error(err.message);
    }
}