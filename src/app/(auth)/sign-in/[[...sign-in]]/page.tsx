import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
  <div className="flex w-full place-items-center ">
  <SignIn />
  </div>)
}