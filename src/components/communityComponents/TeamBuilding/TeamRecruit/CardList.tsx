import { useNavigate } from "react-router-dom";
import defaultImage from "../../../../assets/category/Rhythm.png";
import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import { TTeamBuildPostData } from "../../../../types";

type Props = {
  post: TTeamBuildPostData;
  profileImage: string | undefined;
  isProfileTab: boolean;
};

export default function CardList({ post, profileImage, isProfileTab }: Props) {
  const navigate = useNavigate();
  // console.log("userData", userData);
  const purpose =
    post.purpose === "PORTFOLIO"
      ? "🔥 취업용 포트폴리오"
      : post.purpose === "CONTEST"
      ? "🔥 공모전"
      : post.purpose === "STUDY"
      ? "🔥 스터디"
      : "🔥 상용화";

  const duration =
    post.duration === "3M"
      ? "3개월 이내"
      : post.duration === "6M"
      ? "6개월 이내"
      : post.duration === "1Y"
      ? "1년 이내"
      : "1년 이상";
  console.log("post", post);
  console.log("이미지 경로: ", import.meta.env.VITE_PROXY_HOST + post.thumbnail);

  return (
    <section
      key={post?.id}
      className=" relative h-[500px] border-gray-100 border-[0.7px] rounded-lg border-solid cursor-pointer"
      onClick={() => {
        isProfileTab
          ? navigate("/community/team-building/profile-detail/1")
          : navigate("/community/team-building/team-recruit/1");
      }}
    >
      <img src={defaultImage} alt="썸네일" className="h-[55%] object-cover" />

      <div
        className="absolute top-0 left-0 bg-white rounded-tl-md rounded-br-lg font-DungGeunMo text-black py-1.5 px-4 w-fit font-light
      border-gray-100 border-b-[0.7px] border-r-[0.95px] border-solid
      "
      >
        {post.status_chip}
      </div>

      <div className="px-4 pt-6 h-[45%] bg-gray-800 text-white rounded-b-lg  ">
        <div className="flex flex-col gap-2">
          {isProfileTab ? (
            <div className="flex items-center gap-2 font-DungGeunMo text-black">
              <div className="px-2 py-1 rounded-[4px] bg-white">
                <p>Client</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap  items-center gap-2 font-DungGeunMo text-black">
              {post.want_roles.map((role) => (
                <div className="px-2 py-1 rounded-[4px] bg-white whitespace-nowrap">
                  <p>{role}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <div className="flex items-center px-1.5 py-1.5 bg-gray-100 text-black font-bold rounded-md text-[13px]">
              {purpose}
            </div>
            <div className="flex items-center px-1.5 py-1.5 bg-gray-600 text-white font-bold rounded-md text-[13px]">
              {duration}
            </div>
          </div>
          <div className="my-4 text-heading-20 font-bold text-ellipsis overflow-hidden truncate">
            {isProfileTab ? "Unity, Unreal 사용하는 개발자입니다" : post.title}
          </div>

          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full"
              src={
                profileImage === ""
                  ? defaultProfile
                  : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                  ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + profileImage
                  : profileImage
              }
              alt={`profile-img-${post.id}`}
            />
            <p className="font-bold text-white text-lg">{post.author_data.nickname}</p>
            <span className="text-gray-400 text-xl">|</span>
            <span className="text-white text-lg">{isProfileTab ? "취준생" : `${post.deadline} 까지`}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
