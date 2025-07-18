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
        className="w-full h-[500px] object-contain rounded-lg"
        src={
          import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
            ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + postDetail?.thumbnail
            : postDetail?.thumbnail
        }
        alt="프로젝트 이미지"
      />

      <p className="mt-10 font-DungGeunMo text-[22px] text-primary-400">프로젝트 정보</p>
      <hr className="border-t border-gray-400 my-3" />

      <div className="flex gap-20 mt-5">
        <div className="flex flex-col gap-5 flex-1">
          {/* Row 1 */}
          <div className="flex gap-8 items-start">
            <p className="text-white w-[100px]">구하는 포지션</p>
            <div className="flex flex-wrap gap-2 max-w-[400px]">
              {postDetail?.want_roles.map((role) => (
                <div key={role} className="p-0.5 rounded-[4px] bg-white tracking-[-1px] font-DungGeunMo text-[18px]">
                  <p>{role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-8 items-start">
            <p className="text-white w-[100px]">마감기한</p>
            <span className="text-white">{postDetail?.deadline}</span>
          </div>

          {/* Row 3 */}
          <div className="flex gap-8 items-start">
            <p className="text-white w-[100px] whitespace-nowrap">연락방법</p>
            <a
              href={postDetail?.contact?.startsWith("http") ? postDetail.contact : `https://${postDetail?.contact}`}
              className="relative inline-block w-[300px] truncate text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {postDetail?.contact}
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 flex-1">
          {/* Row 1 */}
          <div className="flex gap-8 items-start">
            <p className="text-white w-[100px]">프로젝트 목적</p>
            <span className="text-white font-bold">{purpose}</span>
          </div>

          {/* Row 2 */}
          <div className="flex gap-8 items-start">
            <p className="text-white w-[100px]">프로젝트 기간</p>
            <span className="text-white font-bold">{duration}</span>
          </div>

          {/* Row 3 */}
          <div className="flex gap-8 items-start">
            <p className="text-white w-[100px]">진행방식</p>
            <span className="text-white font-bold">{meeting_type}</span>
          </div>
        </div>
      </div>

      <p className="mt-20 font-DungGeunMo text-[22px] text-primary-400">상세내용</p>
      <hr className="border-t border-gray-400 my-3" />
      {postDetail && (
        <p
          className="ql-editor !ps-0 text-gray-100 leading-5"
          dangerouslySetInnerHTML={{ __html: sanitizedContent as string }}
        ></p>
      )}
    </div>
  );
}
