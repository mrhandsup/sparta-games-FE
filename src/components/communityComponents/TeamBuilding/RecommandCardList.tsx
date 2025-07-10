import defaultProfile from "../../../assets/common/defaultProfile.svg";
import { TTeamBuildRecommenedPostListItem } from "../../../types";
import { useNavigate } from "react-router-dom";

type Props = {
  post: TTeamBuildRecommenedPostListItem;
};
export default function RecommandCardList({ post }: Props) {
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
    <div
      onClick={() =>
        navigate(`/community/team-building/team-recruit/${post.id}`, {
          state: {
            post,
          },
        })
      }
      className="flex gap-4 p-4 w-full max-w-full bg-gray-800 border border-solid border-gray-400 rounded-lg cursor-pointer"
    >
      <div className="absolute flex items-center justify-center w-[70px] h-6 rounded-tl-md rounded-br-md bg-white border border-solid border-gray-400">
        <p className="font-DungGeunMo text-[13px]">{post.status_chip}</p>
      </div>
      <div className="shrink-0">
        <img
          src={
            import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
              ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + post.thumbnail
              : post.thumbnail
          }
          className="w-[180px] h-[150px] object-cover rounded-md border border-solid border-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1 font-DungGeunMo">
          {post.want_roles.map((role, idx) =>
            idx < 4 ? (
              <div key={idx} className="px-[6px] rounded-[4px] bg-white">
                <span className="rounded-[4px] bg-white text-[16px] leading-6 tracking-[-1.4px]">{role}</span>
              </div>
            ) : idx === 4 && role.startsWith("+") ? (
              <span key={idx} className="text-[18px] text-white tracking-tight ">
                {role}
              </span>
            ) : null,
          )}
        </div>

        <div className="flex gap-1">
          <div className="flex items-center p-1 bg-gray-100 text-black font-bold rounded-[4px] text-[12px] tracking-[-0.5px]">
            {purpose}
          </div>
          <div className="flex items-center p-1 bg-gray-600 text-white rounded-[4px] text-[13px] tracking-[-0.5px]">
            {duration}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0 overflow-hidden">
          <p className="w-[360px] truncate font-bold text-[16px] text-white">{post.title}</p>
          <p
            className="ps-1 line-clamp-2 text-white leading-[18px] font-extralight text-sm tracking-[-0.5px]"
            dangerouslySetInnerHTML={{ __html: post.content_text }}
          ></p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <img
            src={
              post.author_data.image === null
                ? defaultProfile
                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + post.author_data.image
                : post.author_data.image
            }
            className="w-6 h-6 border-[1px] border-solid border-gray-400 rounded-full"
          />
          <div className="flex items-center gap-1">
            <p className="text-white text-base tracking-[-0.5px]">{post.author_data.nickname}</p>
            <span className="text-gray-400 text-xl">|</span>
            <span className="text-white text-base font-light tracking-[-0.5px]">
              {post.deadline.split("-").join(".")} 까지
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
