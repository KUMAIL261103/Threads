"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const UserComponent = ({
  id,
  name,
  username,
  image,

  personType,
}: {
  id: string;
  name: string;
  username: string;
  image: string;

  personType: string;
}) => {
  const router = useRouter();
  //console.log("this is the id", id);
  return (
    <article className="user-card  p-5 rounded-lg">
      <div className="user-card_avatar">
        <Image
          src={image}
          alt="user_image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
      <Button
        className="user-card-btn bg-primary-500 text-light-1 px-5"
        onClick={() => {
          router.push(`/profile/${id}`);
          //console.log("clicked");
        }}
      >
        View
      </Button>
    </article>
  );
};

export default UserComponent;
