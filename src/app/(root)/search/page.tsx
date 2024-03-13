// import Image from "next/image";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserComponent from "@/components/cards/UserComponent";
import { fetchuser } from "@/lib/actions/user.actions";
import { fetchAllUsers } from "@/lib/actions/user.actions";
import { useState } from "react";
import debounce from "lodash.debounce"; // Import the debounce function from lodash
import Search from "@/components/forms/Search";
const Page = async () => {
  //console.log(params);
  // const [searchTerm, setSearchTerm] = useState(""); // Add state to store the search term
  const user: any = await currentUser();
  //console.log("hwrreee", user);
  const userinfo = await fetchuser(user.id);
  //console.log("herre iisssuserinfo", userinfo);
  const dbid = userinfo._id;
  const plainDbId = JSON.parse(JSON.stringify(dbid.toString()));
  //console.log("herre iisssuserinfo", plainDbId);
  if (!user) return null;

  return (
    <>
      <h1 className="text-heading1-semibold mb-10 text-light-2">Search</h1>
      <Search id={user.id} userInfo={plainDbId} />
    </>
  );
};
export default Page;
