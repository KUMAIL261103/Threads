import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThreads";
import { fetchuser } from "@/lib/actions/user.actions";

const Page = async() => {
    const user = await currentUser();
    if(!user)return null;
    // console.log(user);
    // console.log(user.id);
    const userinfo = await fetchuser(user.id);
    
    if(userinfo==null || userinfo.onboarded===false){
        redirect("/onboarding"); 
    }
    //console.log(userinfo);
    //console.log("this is the user id ", userinfo._id);
    return ( <div className="flex flex-col gap-7 max-md:gap-4">
     <h1 className="head-text mx-auto">Create Thread</h1>
     <PostThread userId={userinfo._id.toString()}/> 
    
    </div>
       
     );
}
 
export default Page;