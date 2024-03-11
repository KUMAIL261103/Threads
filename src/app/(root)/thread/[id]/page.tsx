import ThreadComponent from "@/components/cards/ThreadComponent";
import { fetchThreadById } from "@/lib/actions/threads";
import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
// fetchThreadById;
const Page = async ({ params }: { params: { id: string } }) => {
  //console.log(params);
  const id = params;

  const user = await currentUser();
  if (!user) return null;
  const userinfo = await fetchuser(user.id);
  if (!userinfo.onboarded) {
    redirect("/onboarding");
  }
  const thread = await fetchThreadById(id);

  return (
    <section className="relative">
      <div className="flex flex-col gap-10  text-light-2 !bg-dark-2 rounded-lg">
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
          color="bg-dark-2"
          totalLikes={thread.totalLikes}
          isComment={thread.children.length === 0 ? false : true}
        />
      </div>
      <div>
        <Comment
          threadId={id.id}
          currentUserId={user?.id}
          currentUserImage={user?.imageUrl}
        />
      </div>
      <div className="mt-5 text-light-2 flex flex-col gap-5 ">
        {thread.children?.map((comment: any) => (
          <ThreadComponent
            key={comment._id}
            parentId={comment.parentId}
            current_userid={user?.id || ""}
            postid={comment._id}
            content={comment.text}
            author={comment.author}
            color="bg-dark-1"
            community={comment.author.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            totalLikes={comment.totalLikes}
            isComment={comment.children.length === 0 ? false : true}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
