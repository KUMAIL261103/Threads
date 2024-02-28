import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
    return (<div className="flex place-items-center w-full h-full">
        <SignUp />;
    </div>)
}