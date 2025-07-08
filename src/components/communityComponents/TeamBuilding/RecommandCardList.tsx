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
      className="flex gap-5 p-4 mx-auto w-full border border-solid border-gray-400 rounded-lg cursor-pointer"
    >
      <div className="relative flex-[0.4]">
        <div className="absolute flex items-center justify-center w-16 h-5 rounded-tl-md rounded-br-md bg-white border border-solid border-gray-400">
          <p className="font-DungGeunMo text-xs">{post.status_chip}</p>
        </div>
        <div className="aspect-[1/0.8]">
          <img
            src={
              import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + post.thumbnail
                : post.thumbnail
            }
            className="w-full h-full object-cover rounded-md border border-solid border-gray-400"
          />
        </div>
      </div>
      <div className="flex flex-col flex-[0.6] gap-2">
        <div className="flex flex-wrap items-center gap-2 font-DungGeunMo">
          {post.want_roles.map((role) => (
            <div className="px-2 py-1 rounded-[4px] bg-white">
              <p>{role}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex items-center px-1.5 py-1.5 bg-gray-100 text-black font-bold rounded-md text-[13px]">
            {purpose}
          </div>
          <div className="flex items-center px-1.5 py-1.5 bg-gray-600 text-white font-bold rounded-md text-[13px]">
            {duration}
          </div>
        </div>

        <div className="flex flex-col justify-center h-full">
          <p className="w-[390px] truncate font-bold text-lg text-white text-center">{post.title}</p>
          <p
            className="h= line-clamp-2 text-white leading-5"
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
            className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full"
          />
          <p className="font-bold text-white text-lg">{post.author_data.nickname}</p>
          <span className="text-gray-400 text-xl">|</span>
          <span className="text-white text-lg tracking-wide">{post.deadline.split("-").join(".")} 까지</span>
        </div>
      </div>
    </div>
  );
}
