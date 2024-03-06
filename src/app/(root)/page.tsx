import "tailwindcss/tailwind.css";
import { fetchThreads } from "@/lib/actions/threads";
import ThreadComponent from "@/components/cards/ThreadComponent";
import { currentUser } from "@clerk/nextjs";
// import { Tourney } from "next/font/google";
// import Comment from "@/components/forms/Comment";
export default async function home() {
  let threads = await fetchThreads(1, 30);
  // console.log(threads);
  const user = await currentUser();
  //console.log(user);
  let threadscontent = threads.threads;
  //console.log(threadscontent);
  if (threadscontent?.length === 0) {
    return <div>NO Threads are created</div>;
  } else {
    return (
      <div className="flex flex-col gap-10  text-light-2">
        {threadscontent?.map((thread, index) => (
          <ThreadComponent
            key={thread._id}
            parentId={thread.parentId}
            current_userid={user?.id || ""}
            postid={thread._id}
            content={thread.text}
            author={thread.author}
            community={thread.author.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            totalLikes={thread.totalLikes}
            isComment={thread.children.length === 0 ? false : true}
            color={"bg-dark-2"}
          />
        ))}
      </div>
    );
  }
}
