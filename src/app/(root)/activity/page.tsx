import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserComponent from "@/components/cards/UserComponent";
import { fetchuser, getActivity } from "@/lib/actions/user.actions";
import { fetchAllUsers } from "@/lib/actions/user.actions";
import Link from "next/link";
const Page = async () => {
  //console.log(params);

  const user = await currentUser();
  if (!user) return null;
  //console.log(user);
  const userInfo = await fetchuser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const getActivitydata = await getActivity(userInfo._id);
  console.log(getActivitydata);
  return (
    <>
      <h1 className="text-heading1-semibold text-light-2">Activity</h1>
      <section className="mt-10 flex flex-col">
        {getActivitydata.length == 0 ? (
          <h1 className="no-result ">No activity found</h1>
        ) : (
          getActivitydata.map((activity, index) => (
            <Link href={`/thread/${activity.parentId}`} key={index}>
              <article className="activity-card my-2">
                <Image
                  src={activity.author.image}
                  alt="author"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p className="text-light-2">
                  <span className="mr-2 text-primary-500">
                    {activity.author.name}
                  </span>
                  replied to your thread
                </p>
              </article>
            </Link>
          ))
        )}
      </section>
    </>
  );
};

export default Page;
