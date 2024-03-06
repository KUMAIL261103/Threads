import home from "../assets/home.svg";
import search from "../assets/search.svg";
import activity from "../assets/heart.svg";
import create from "../assets/create.svg";
import community from "../assets/community.svg";
import user from "../assets/user.svg";
import reply from "../assets/reply.svg";
import members from "../assets/members.svg"
import tag from "../assets/tag.svg";
import request from "../assets/request.svg"

// console.log("hwee",home);
export const sidebarLinks = [
  {
    imgURL: `${home.src}`,
    route: "/",
    label: "Home",
  },
  {
    imgURL: `${search.src}`,
    route: "/search",
    label: "Search",
  },
  {
    imgURL: `${activity.src}`,
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: `${create.src}`,
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: `${community.src}`,
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: `${user.src}`,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: `${reply.src}` },
  { value: "replies", label: "Replies", icon:   `${members.src}` },
  { value: "Liked", label: "Liked", icon: `${activity.src}` },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: `${reply.src}` },
  { value: "members", label: "Members", icon: `${members.src}` },
  { value: "requests", label: "Requests", icon: `${request.src}` },
];