import DOMPurify from "dompurify";

import { TTeamBuildPostDetail } from "../../../../types";

type Props = {
  postDetail: TTeamBuildPostDetail | undefined;
};
export default function RecruitDetailInfo({ postDetail }: Props) {
  const config = {
    ALLOWED_TAGS: ["h1", "h2", "p", "strong", "span", "em", "u", "ol", "ul", "li", "br", "img", "s"],
    ALLOWED_ATTR: ["class", "style", "src", "width", "height"],
  };

  const sanitizedContent = postDetail?.content && DOMPurify.sanitize(postDetail?.content, config);

  const purpose =
    postDetail?.purpose === "PORTFOLIO"
      ? "포트폴리오"
      : postDetail?.purpose === "CONTEST"
      ? "공모전"
      : postDetail?.purpose === "COMMERCIAL"
      ? "상용화"
      : "스터디";

  const duration =
    postDetail?.duration === "3M"
      ? "3개월 이내"
      : postDetail?.duration === "6M"
      ? "6개월 이내"
      : postDetail?.duration === "1Y"
      ? "1년 이내"
      : "1년 이상";

  const meeting_type =
    postDetail?.meeting_type === "OFFLINE"
      ? "오프라인"
      : postDetail?.meeting_type === "ONLINE"
      ? "온라인"
      : "둘 다 가능";

  return (
    <div className="mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
      <img
        className="w-full h-[500px] object-cover rounded-lg"
        src={
          import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
            ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + postDetail?.thumbnail
            : postDetail?.thumbnail
        }
        alt="프로젝트 이미지"
      />

      <p className="mt-10 font-DungGeunMo text-xl text-primary-400">프로젝트 정보</p>
      <hr className="border-t border-gray-400 my-3" />

      <div className="flex gap-5 mt-5">
        <div className="flex flex-col gap-4  flex-1">
          <div className="flex gap-12">
            <p className="text-white text-sm">구하는 포지션</p>

            <div className="flex flex-wrap gap-2 max-w-[400px]">
              {postDetail?.want_roles.map((role) => (
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>{role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-[74px]">
            <p className="text-white text-sm">마감기한</p>
            <span className="text-white">{postDetail?.deadline}</span>
          </div>

          <div className="flex gap-[74px]">
            <p className="text-white text-sm">연락방법</p>
            <a
              href={postDetail?.contact}
              className="relative inline-block w-[400px] truncate  text-white underline cursor-default pointer-events-none"
            >
              <span className="pointer-events-auto cursor-pointer">{postDetail?.contact}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex gap-12">
            <p className="text-white text-sm">프로젝트 목적</p>
            <span className="text-white font-bold text-sm">{purpose}</span>
          </div>

          <div className="flex gap-12">
            <p className="text-white text-sm">프로젝트 기간</p>
            <span className="text-white font-bold text-sm">{duration}</span>
          </div>

          <div className="flex gap-[76px]">
            <p className="text-white text-sm">진행방식</p>
            <span className="text-white font-bold text-sm">{meeting_type}</span>
          </div>
        </div>
      </div>

      <p className="mt-10 font-DungGeunMo text-xl text-primary-400">상세내용</p>
      <hr className="border-t border-gray-400 my-3" />
      {postDetail && (
        <p
          className="ql-editor text-base text-gray-100 leading-5"
          dangerouslySetInnerHTML={{ __html: sanitizedContent as string }}
        ></p>
      )}
    </div>
  );
}
