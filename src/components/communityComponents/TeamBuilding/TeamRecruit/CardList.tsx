import { useNavigate } from "react-router-dom";

import { TTeamBuildPostListItem, TTeamBuildProfileListItem, TUserData } from "../../../../types";

import defaultProfile from "../../../../assets/common/defaultProfile.svg";

type TeamBuildCardProps = {
  postType: "teamBuild";
  post: TTeamBuildPostListItem;
  userData: TUserData | undefined;
};

type ProfileCardProps = {
  postType: "profile";
  post: TTeamBuildProfileListItem;
  userData: TUserData | undefined;
};

type Props = TeamBuildCardProps | ProfileCardProps;

export default function CardList({ postType, post, userData }: Props) {
  const navigate = useNavigate();

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

  return (
    <section
      key={post?.id}
      className=" relative h-[500px] flex flex-col border-gray-100 border-[0.7px] rounded-lg border-solid cursor-pointer"
      onClick={() => {
        postType === "profile"
          ? navigate(`/community/team-building/profile-detail/${post.author_data.id}`, {
              state: {
                post,
                userData,
              },
            })
          : navigate(`/community/team-building/team-recruit/${post.id}`, {
              state: {
                post,
              },
            });
      }}
    >
      <div className="h-[55%] relative">
        {postType === "teamBuild" ? (
          <img
            src={
              import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + (post.thumbnail || "")
                : post.thumbnail || ""
            }
            className="h-full object-cover"
          />
        ) : (
          <img
            src={
              post.profile_image === null
                ? defaultProfile
                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + (post.profile_image || "")
                : post.profile_image || ""
            }
            className="w-full h-full object-cover"
          />
        )}

        {postType === "teamBuild" && (
          <div className="absolute top-0 left-0 bg-white rounded-tl-md rounded-br-lg font-DungGeunMo text-black py-1.5 px-4 w-fit font-light border-gray-100 border-b-[0.7px] border-r-[0.95px] border-solid">
            {post.status_chip}
          </div>
        )}
      </div>

      <div className="flex-1 px-4 pt-6 bg-gray-800 text-white flex flex-col justify-between">
        <div className="flex flex-col gap-2 overflow-hidden flex-1">
          {postType === "profile" ? (
            <div className="flex items-center gap-2 font-DungGeunMo text-black">
              <div className="px-2 py-1 rounded-[4px] bg-white">
                <p>{post.my_role}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-start gap-2 max-h-[64px] font-DungGeunMo text-black">
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
          <div className="my-4 text-heading-20 font-bold text-ellipsis overflow-hidden truncate">{post.title}</div>
        </div>
        <div className="flex items-center gap-2 pb-4">
          <img
            className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full"
            src={
              post.author_data.image === null
                ? defaultProfile
                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + post.author_data.image
                : post.author_data.image
            }
            alt={`profile-img-${post.id}`}
          />
          <p className="font-bold text-white text-lg truncate max-w-[100px]">{post.author_data.nickname}</p>
          <span className="text-gray-400 text-xl">|</span>
          <span className="text-white text-lg ">{postType === "profile" ? post.career : `${post.deadline} 까지`}</span>
        </div>
      </div>
    </section>
  );
}
