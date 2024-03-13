import mongoose from "mongoose";
const CommunitySchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    image:{
        type:String,
    },
    bio:{
        type:String,
    },
    threads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
const Community = mongoose.models.Community ||  mongoose.model("Community",CommunitySchema);
export default Community;