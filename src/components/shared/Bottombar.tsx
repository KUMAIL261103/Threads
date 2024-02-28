"use client"
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname ,useRouter } from "next/navigation";
const Bottombar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return ( 
        <div className="w-full flex flex-auto justify-between flex-row bg-dark-2 gap-1 md:hidden">
                    {

                        sidebarLinks.map((links)=>{
                            const isActive =(pathname.includes(links.route)&& links.route.length>1) || pathname == links.route;
                            return(
                                <Link href={links.route} key={links.label} className={`leftsidebar_link rounded-sm ${isActive===false && `hover:bg-slate-950`}  ${isActive  && `bg-primary-500`}`}>
                                    <div className="flex flex-col text-light-2 flex-1 gap-y-2 place-items-center">
                                    <Image  src={links.imgURL} alt={links.label} width={24} height={24}/>
                                    <p className="max-sm:hidden">{links.label}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
    );
}
 
export default Bottombar;