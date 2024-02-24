import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css"
const inter = Inter({ subsets: ["latin"] });
import Topbar from "@/components/shared/Topbar";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import Bottombar from "@/components/shared/Bottombar";
export const metadata= {
    title:"Threads",
    description:"A Nextjs 14 Threads web-application"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}  `}>
        <Topbar/>
        <main className="flex ">
          <Leftsidebar/>
          <section className="main-container">
              <div className="w-full max-w-4xl  ">
                {children}
              </div>
          </section>
          <Rightsidebar/>
        </main>
        
        <Bottombar/>
      </body>
    </html>
    </ClerkProvider>
  );
}
