import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
type userInfotype = {
  username?: string;
  name?: string;
  _id?: string;
  bio?: string;
  image?: string;
  objectid?: string;
};
export default async function onboarding() {
  const user = await currentUser();
  //console.log(user);
  const userInfo: userInfotype = {};
  const userData = {
    id: user?.id || "",
    objectid: userInfo?._id || "",
    username: userInfo?.username || user?.username || "",
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",
  };
  return (
    <main className="mx-auto text-light-2 flex flex-col max-w-3xl flex-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-5 text-base-regular ">
        {" "}
        Complete your profile to use threads
      </p>
      <section className="mt-8 bg-dark-2 p-10">
        <AccountProfile user={userData} btn_title="continue" />
      </section>
    </main>
  );
}
