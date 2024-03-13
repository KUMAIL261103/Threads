// "use client";
import Image from "next/image";
import heart from "../../assets/heart-gray.svg";
import reply from "../../assets/reply.svg";
import repost from "../../assets/repost.svg";
import Link from "next/link";
interface Props {
  // key: number | string;
  parentId: string | null;
  current_userid: string | null;
  postid: string;
  content: string;
  author: {
    username: string;
    image: string;
    id: string;
  };
  comments:
    | {
        author: {
          image: string;
        };
      }[]
    | null;
  createdAt: Date;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  isComment: Boolean;
  // isLiked: Boolean;
  totalLikes: number;
  color: string;
  // data:{
  //     text:string,
  //     author:{
  //         username:string,
  //         name:string,
  //         threads:string[],
  //         bio:string,
  //         image:string,
  //         community:string[],
  //         id:string,
  //         onboarded:Boolean,
  //     },
  //     community:string[],
  //     children:string[],
  //     createdAt:Date,
  // }
}
const ThreadComponent = ({
  // key,
  current_userid,
  postid,
  content,
  community,
  parentId,
  author,
  createdAt,
  comments,
  isComment,
  totalLikes,
  color,
  // isLiked,
}: Props) => {
  //console.log(author);
  //console.log(isComment, "this iss...");
  return (
    // <Link href={`/thread/${postid}`}>
    <article
      className={`flex flex-col  rounded-xl w-full p-7  max-md:p-4  ` + color}
    >
      <div className="h-full">
        <div className="flex items-center w-full gap-8">
          <Link href={`/profile/${author.id}`}>
            <Image
              src={author.image}
              alt="profile image"
              width={50}
              height={50}
              priority
              className="rounded-full object-contain"
            />
          </Link>
          <div className="text-light-2 text-body-bold bottom-2 relative ">
            {author.username}
          </div>
        </div>
        <div className="pl-20 relative bottom-2  text-body-normal max-sm:pl-5 max-sm:top-2">
          {content}
        </div>
        <div className="flex gap-x-5 mt-2 pl-20 max-sm:mt-5">
          <Link href={`/thread/${postid}`}>
            <Image
              src={reply}
              alt="reply"
              className="cursor-pointer object-contain"
            />
          </Link>
          {totalLikes > 0 && (
            <p className="text-subtle-medium text-gray-1">{totalLikes}</p>
          )}
          <button title="Like" type="button">
            <Image
              src={heart}
              alt="like"
              className="cursor-pointer object-contain"
            />
          </button>
          <button title="Repost" type="button">
            <Image
              src={repost}
              alt="repost"
              className="cursor-pointer object-contain"
            />
          </button>
        </div>
        <div
          className={`w-0.5 grow rounded-full bg-neutral-800 h-full ml-6 bottom-12 z-10 max-sm:bottom-5 ${comments?.length == 0 ? "hidden" : "relative"}`}
        ></div>
        {isComment && comments?.length !== 0 && (
          <Link href={`/thread/${postid}`}>
            <p className="text-subtle-medium mt-1 text-gray-1">
              {comments?.length} replies
            </p>
          </Link>
        )}
        {!isComment && community && <h1>{community.name}</h1>}
      </div>
    </article>
    // </Link>
  );
};

export default ThreadComponent;
