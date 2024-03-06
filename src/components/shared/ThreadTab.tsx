import { redirect } from "next/navigation";

//import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";

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
}

interface Props {
  currentUserId: string;
  accountId: any;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === "Community") {
    //result = await fetchCommunityPosts(accountId);
    result = await fetchUserPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread) => (
        <ThreadComponent
          key={thread._id}
          postid={thread._id}
          current_userid={currentUserId}
          parentId={thread.parentId}
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
          isComment={thread.children.length === 0 ? false : true}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
