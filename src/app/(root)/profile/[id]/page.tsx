import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadTab";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchuser } from "@/lib/actions/user.actions";
interface Params {
  params: {
    id: string;
  };

  searchParams: string;
}
const Page = async (params: Params) => {
  //console.log(params);
  const { id } = params.params;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchuser(id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accId={userInfo.id}
        dbaccid={userInfo._id}
        name={userInfo.name}
        username={userInfo.username}
        img={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-[50%] bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo._id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
export default Page;
