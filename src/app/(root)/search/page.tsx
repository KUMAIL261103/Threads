import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadTab";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchuser } from "@/lib/actions/user.actions";
import exp from "constants";
const Page = async () => {
  //console.log(params);

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchuser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return <h1>hello</h1>;
};
export default Page;
