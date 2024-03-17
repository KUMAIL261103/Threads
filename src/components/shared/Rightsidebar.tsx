import { fetchAllUsers, fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import UserComponent from "../cards/UserComponent";

const Rightsidebar = async () => {
  const userinfo: any = await currentUser();
  const userdbid = await fetchuser(userinfo.id);
  const users = await fetchAllUsers({ userId: userdbid._id });
  const userarray = users.users;
  return (
    <section className="custom-scrollbar rightsidebar ">
      <div className="flex flex-1 flex-col justify-start">
        <p className="text-heading4-medium text-light-1 mb-1">
          Suggested Communities
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <p className="text-heading4-medium text-light-1 mb-1">
          Suggested Users
        </p>
        {userarray.map((user: any, index: number) => {
          return (
            <UserComponent
              key={index}
              username={user.username}
              image={user.image}
              id={user._id.toString()}
              name={user.name}
              personType="user"
            />
          );
        })}
      </div>
    </section>
  );
};

export default Rightsidebar;
