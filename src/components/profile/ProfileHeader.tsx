import Image from "next/image";
interface Props {
  accId: string | null;
  dbaccid: string | null;
  name: string;
  username: string;
  bio: string;
  img: string;
}
const ProfileHeader = ({ accId, dbaccid, name, username, bio, img }: Props) => {
  // console.log(accId, dbaccid, name, username, bio, img);
  return (
    // <div>hello</div>
    <div className="flex w-full flex-col justify-start">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-contain">
            <Image
              src={img}
              alt="profile"
              fill={true}
              className="rounded-full object-cover shadow-2xl "
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">{username}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-12  h-0.5 bg-dark-3"></div>
    </div>
  );
};

export default ProfileHeader;
