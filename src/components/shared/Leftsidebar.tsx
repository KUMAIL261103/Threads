"use client"
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {usePathname , useRouter } from "next/navigation";
import logout from "../../assets/logout.svg";
import {  SignOutButton, SignedIn } from "@clerk/nextjs";
const Leftsidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return ( 
        <section>
            <div className="custom-scrollbar leftsidebar  sticky">
                <div className="w-full flex flex-1 flex-col gap-2 px-6">
                    {

                        sidebarLinks.map((links)=>{
                            const isActive =(pathname.includes(links.route)&& links.route.length>1) || pathname == links.route;
                            return(
                                <Link href={links.route} key={links.label} className={`leftsidebar_link ${isActive===false && `hover:bg-slate-950`}  ${isActive  && `bg-primary-500`}`}>
                                    <Image  src={links.imgURL} alt={links.label} width={24} height={24}/>
                                    <p className="text-white max-lg:hidden">{links.label}</p>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="mt-12 mx-6  hover:bg-slate-950 p-4 rounded-lg flex gap-4">
            
                    <SignedIn>
                        <SignOutButton signOutCallback={()=>{router.push('/sign-in')}}>
                            <div className="flex cursor-pointer  ">
                                <Image src={logout} alt="logout" width={24} height={24}/>
                            </div>
                            
                        </SignOutButton>
                    <p className="text-light-2 max-lg:hidden">Logout</p>
                    </SignedIn>
                </div> 

            </div>
            
        </section>
     );
}
 
export default Leftsidebar;