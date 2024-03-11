import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchuser } from "@/lib/actions/user.actions";

const Page = async () => {
  //console.log(params);

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchuser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  //const allusers = await fetchallusers();

  return <h1>hello</h1>;
};
export default Page;
