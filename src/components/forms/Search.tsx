"use client";
import debounce from "lodash.debounce";
import { fetchuser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/lib/actions/user.actions";
import UserComponent from "../cards/UserComponent";
import { redirect } from "next/navigation";
import { set } from "mongoose";
const Search = (props: { id: string; userInfo: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allusersinfo, setAllUsersInfo] = useState<any>([]);
  const id = props.id;
  const userID = props.userInfo;
  console.log("herre should be id", id);
  console.log("herre should be userID", userID);
  useEffect(() => {
    fetchAllUsers({
      userId: userID,
      searchString: searchTerm,
    })
      .then((data) => {
        setAllUsersInfo(data.users);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const debouncedSearch = debounce((search: string) => {
    fetchAllUsers({
      userId: userID,
      searchString: search,
    })
      .then((data) => {
        console.log("herre is the data", data);
        setAllUsersInfo(data.users);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log("all the user data from api", allusers);
    //console.log("all the user data", allusersinfo);
  }, 1000);
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let search = e.currentTarget.value;
    setSearchTerm(search);
    console.log(searchTerm);
    debouncedSearch(searchTerm);
  };

  return (
    <div className="mt-4 ">
      <input
        type="search"
        title="search"
        placeholder="Search"
        className="search-input  w-full p-3 bg-dark-3
         rounded-lg border-2 border-gray-1  focus:outline-none focus:border-primary-500 transition-all duration-300 ease-in-out"
        onChange={handleSearch}
      ></input>
      <div className="mt-10">
        {/* <h1>hhlll</h1> */}
        {allusersinfo?.length == 0 ? (
          <h1 className="no-result ">No users found</h1>
        ) : (
          allusersinfo?.map((user: any, index: number) => (
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
    </div>
  );
};

export default Search;
