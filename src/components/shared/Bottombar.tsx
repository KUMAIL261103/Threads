"use client"
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname ,useRouter } from "next/navigation";
const Bottombar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return ( 
        <div className="w-full flex flex-auto justify-between flex-row bg-dark-2 gap-1 sm:hidden">
                    {

                        sidebarLinks.map((links)=>{
                            const isActive =(pathname.includes(links.route)&& links.route.length>1) || pathname == links.route;
                            return(
                                <Link href={links.route} key={links.label} className={`leftsidebar_link rounded-sm ${isActive===false && `hover:bg-slate-950`}  ${isActive  && `bg-primary-500`}`}>
                                    <Image  src={links.imgURL} alt={links.label} width={24} height={24}/>
                                  
                                </Link>
                            )
                        })
                    }
                </div>
    );
}
 
export default Bottombar;