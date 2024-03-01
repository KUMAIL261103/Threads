import * as z from "zod";
export const ThreadValidation = z.object({
    
    threads:z.string().nonempty().min(3,{message:'Minimum 3 character required for a thread'}).max(1000),
    accountId:z.string().min(3).max(30),
})
export const CommentValidation = z.object({
     threads:z.string().min(3,{message:'Minimum 3 character required for a thread'}).max(1000).nonempty(),
})