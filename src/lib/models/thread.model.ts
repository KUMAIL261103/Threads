import mongoose from "mongoose";
const threadSchema = new mongoose.Schema({
    text:{type:String,required:true},
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    community:{
        type:mongoose.Schema.ObjectId,
        ref:'Community',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    parentId:{
        //type:String,
        type:mongoose.Schema.ObjectId,
        refer:'Thread',
        
    },
    children:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'Thread'}
    ],
    likeduser:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
    ],

   

});

const Thread = mongoose.models.Thread || mongoose.model("Thread",threadSchema);
export default Thread;