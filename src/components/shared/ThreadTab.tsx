import { redirect } from "next/navigation";

//import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import {
  fetchUserPosts,
  fetchUserPostsLiked,
  fetchUserPostsreplies,
} from "@/lib/actions/user.actions";

import ThreadComponent from "@/components/cards/ThreadComponent";

interface Result {
  username: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: Date;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
  likedthread: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: Date;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: any;
  accountType: string;
  tabs: string;
}

async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
  tabs,
}: Props) {
  let result: Result;
  // let result: any;

  if (accountType === "Community") {
    //result = await fetchCommunityPosts(accountId);

    result = await fetchUserPosts(accountId);
  } else {
    if (tabs === "threads") {
      result = await fetchUserPosts(accountId);
      //console.log(result);
    } else if (tabs === "replies") {
      result = await fetchUserPostsreplies(accountId);
    } else {
      result = await fetchUserPostsLiked(accountId);
      //all liked threads
    }
  }

  // if (!result) {
  //   redirect("/");
  // }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {tabs !== "Liked" && result.threads.length === 0 && (
        <p>No threads found</p>
      )}
      {tabs !== "Liked" &&
        result.threads.length !== 0 &&
        result.threads.map((thread: any) => (
          <ThreadComponent
            key={thread._id}
            postid={thread._id}
            current_userid={currentUserId}
            parentId={thread.parentId}
            // color={"bg-dark-2"}
            content={thread.text}
            author={
              accountType === "User"
                ? {
                    username: result.username,
                    image: result.image,
                    id: result.id,
                  }
                : {
                    username: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={
              accountType === "Community"
                ? { name: result.username, id: result.id, image: result.image }
                : thread.community
            }
            createdAt={thread.createdAt}
            comments={thread.children}
            totalLikes={thread.likeduser?.length}
            // isLiked={thread.LikedUser.length === 0 ? false : true}
            isComment={thread.children?.length === 0 ? false : true}
          />
        ))}
      {tabs === "Liked" && result.likedthread.length === 0 && (
        <p>No liked threads found</p>
      )}
      {tabs === "Liked" &&
        result.likedthread.length !== 0 &&
        result.likedthread.map((thread: any) => (
          <ThreadComponent
            key={thread._id}
            postid={thread._id}
            current_userid={currentUserId}
            parentId={thread.parentId}
            // color={"bg-dark-2"}
            content={thread.text}
            author={
              accountType === "User"
                ? {
                    username: result.username,
                    image: result.image,
                    id: result.id,
                  }
                : {
                    username: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={
              accountType === "Community"
                ? { name: result.username, id: result.id, image: result.image }
                : thread.community
            }
            createdAt={thread.createdAt}
            comments={thread.children}
            totalLikes={thread.likeduser?.length}
            // isLiked={thread.LikedUser.length === 0 ? false : true}
            isComment={thread.children?.length === 0 ? false : true}
          />
        ))}
    </section>
  );
}

export default ThreadsTab;
