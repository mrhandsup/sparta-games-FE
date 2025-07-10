import { useNavigate } from "react-router-dom";

import { TTeamBuildPostListItem, TTeamBuildProfileListItem, TUserData } from "../../../types";

import defaultProfile from "../../../assets/common/defaultProfile.svg";

type TeamBuildCardProps = {
  postType: "teamBuild";
  post: TTeamBuildPostListItem;
  userData?: TUserData;
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

  const career = post?.career === "STUDENT" ? "대학생" : post?.career === "JOBSEEKER" ? "취준생" : "현직자";

  const isMyProfile = post?.author_data.id === userData?.user_id;
  const handleProfileNavigate = () => {
    if (isMyProfile) {
      navigate(`/my-page/${userData?.user_id}?tab=teambuilding`);
    } else {
      navigate(`/community/team-building/profile-detail/${post.author_data.id}`);
    }
  };

  return (
    <section
      key={post?.id}
      className="relative flex flex-col h-[400px] border-gray-100 border-[0.7px] rounded-lg border-solid cursor-pointer"
      onClick={() => {
        postType === "profile" ? handleProfileNavigate() : navigate(`/community/team-building/team-recruit/${post.id}`);
      }}
    >
      <div className="h-[60%] relative">
        {postType === "teamBuild" ? (
          <img
            src={
              import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + (post.thumbnail || "")
                : post.thumbnail || ""
            }
            className="w-full h-full object-cover rounded-t-lg"
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
            className="w-full h-full object-cover rounded-t-lg"
          />
        )}

        {postType === "teamBuild" && (
          <div className=" absolute top-0 left-0 w-[70px] py-0.5 rounded-tl-md rounded-br-lg bg-white text-black font-DungGeunMo text-center border-gray-100 border-b-[0.7px] border-r-[0.95px] border-solid">
            <span className="text-[13px]">{post.status_chip}</span>
          </div>
        )}
      </div>

      <div className="flex-1 px-4 pt-4 bg-gray-800 text-white flex flex-col justify-between rounded-b-lg">
        <div className="flex flex-col gap-2 overflow-hidden flex-1">
          {postType === "profile" ? (
            <div className="flex items-center gap-1 font-DungGeunMo text-black">
              <div className="px-2 py-1 rounded-[4px] bg-white">
                <p className="tracking-tight">{post.my_role}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1 font-DungGeunMo">
              {post.want_roles.map((role, idx) =>
                idx < 3 ? (
                  <div key={idx} className="px-[6px] rounded-[4px] bg-white whitespace-nowrap">
                    <span className="text-[16px] leading-6 tracking-[-1.4px] text-gray-700">{role}</span>
                  </div>
                ) : idx === 3 && role.startsWith("+") ? (
                  <span key={idx} className="text-[18px] text-white tracking-tight ">
                    {role}
                  </span>
                ) : null,
              )}
            </div>
          )}
          <div className="flex gap-1">
            <div className="flex items-center p-1 bg-gray-100 text-black font-bold text-[12px] tracking-[-0.5px] rounded-[4px]">
              {purpose}
            </div>
            <div className="flex items-center p-1 bg-gray-600 text-white rounded-[4px] text-[11px] tracking-[-0.5px]">
              {duration}
            </div>
          </div>
          <div className="mt-auto mb-auto truncate text-[16px] font-semibold">{post.title}</div>
        </div>
        <div className="flex items-center gap-2 pb-3">
          <img
            className="w-6 h-6 border-[1px] border-solid border-gray-400 rounded-full"
            src={
              post.author_data.image === null
                ? defaultProfile
                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + post.author_data.image
                : post.author_data.image
            }
            alt={`profile-img-${post.id}`}
          />
          <div className="flex gap-1 items-center">
            <p
              className={`font-bold text-white text-[16px] truncate ${
                postType === "profile" ? "max-w-[140px]" : "max-w-[80px]"
              }`}
            >
              {post.author_data.nickname}
            </p>
            <span className="text-gray-400 text-xl">|</span>
            <span className="text-white text-[15px] font-light tracking-wide">
              {postType === "profile" ? career : `${post.deadline.split("-").join(".")} 까지`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
