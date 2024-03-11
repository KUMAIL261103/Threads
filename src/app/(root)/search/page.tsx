// import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserComponent from "@/components/cards/UserComponent";
import { fetchuser } from "@/lib/actions/user.actions";
import { fetchAllUsers } from "@/lib/actions/user.actions";
const Page = async () => {
  //console.log(params);

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchuser(user.id);
  if (userInfo == undefined || !userInfo?.onboarded) redirect("/onboarding");
  const allusers = await fetchAllUsers({ userId: userInfo._id });
  // console.log(allusers);
  const allusersinfo = allusers.users;
  return (
    <>
      <h1 className="text-heading1-semibold mb-10 text-light-2">Search</h1>
      <div className="mt-10">
        {allusersinfo.length == 0 ? (
          <h1 className="no-result ">No users found</h1>
        ) : (
          allusersinfo.map((user, index) => (
            <UserComponent
              key={index}
              id={user.id}
              name={user.name}
              username={user.username}
              image={user.image}
              //bio={user.bio}
              personType="User"
            />
          ))
        )}
      </div>
    </>
  );
};
export default Page;
