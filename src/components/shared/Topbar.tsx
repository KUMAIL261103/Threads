import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import logout from "../../assets/logout.svg";
import {dark} from "@clerk/themes";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
const Topbar = () => {
    return ( 
        <nav className="topbar ">
            <Link href={"/"} className="flex items-center gap-4">
                <Image src={logo} alt="logo " width={28} height={28}/> 
                 <p className=" text-light-1 max-sm:hidden">
                Threads
                </p>
            </Link>
            <div className="flex items-center gap-1">
                <div className=" block md:hidden ">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer gap-1 ">
                                <Image src={logout} alt="logout" width={24} height={24}/>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>  
                <OrganizationSwitcher
                appearance={
                    {
                        baseTheme:dark,
                        elements:{
                            organizationSwitcherTrigger:"px-4 py-2"
                        }
                    }
                }/>
            </div>
            
           
            
        </nav>
     );
}
 
export default Topbar;