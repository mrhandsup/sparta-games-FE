import { useNavigate } from "react-router-dom";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import backIcon from "../../../../assets/common/arrow/triangleArrowLeft.svg";
import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import { TTeamBuildPostDetail, TUserData } from "../../../../types";

type Props = {
  userData: TUserData | undefined;
  postDetail: TTeamBuildPostDetail | undefined;
  postStatus: "모집중" | "모집마감";
  onClickCloseRecruit: () => void;
  onClickDeleteRecruit: () => void;
};
export default function RecruitHeader({
  userData,
  postDetail,
  postStatus,
  onClickCloseRecruit,
  onClickDeleteRecruit,
}: Props) {
  const navigate = useNavigate();

  const isMyPost = userData?.user_id === postDetail?.author_data.id;
  return (
    <>
      <img onClick={() => window.history.back()} className="my-6 cursor-pointer" src={backIcon} alt="뒤로가기" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-[4px] font-DungGeunMo text-black bg-white">
            <p className="w-[64px] text-center">{postStatus}</p>
          </div>
          <p className="w-[800px] line-clamp-3 font-DungGeunMo text-white text-2xl">{postDetail?.title}</p>
        </div>

        <div className="flex gap-3 w-[300px]">
          {isMyPost && (
            <>
              <SpartaButton
                content="마감"
                size="small"
                colorType="grey"
                customStyle={`${
                  postStatus === "모집마감" ? "opacity-0 pointer-events-none" : "block"
                }  w-full hover:text-alert-default hover:border-alert-default`}
                onClick={onClickCloseRecruit}
              />

              <SpartaButton
                content="수정"
                size="small"
                colorType="grey"
                customStyle="w-full hover:text-alert-default hover:border-alert-default"
                onClick={() =>
                  navigate(`/community/team-building/team-recruit/edit/${postDetail?.id}`, {
                    state: { postDetail, isEditMode: true },
                  })
                }
              />
              <SpartaButton
                content="삭제"
                size="small"
                colorType="grey"
                customStyle="w-full hover:text-error-default hover:border-error-default"
                onClick={onClickDeleteRecruit}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <div className="flex items-center gap-1">
          <img
            src={
              postDetail?.author_data.image === null
                ? defaultProfile
                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + postDetail?.author_data.image
                : postDetail?.author_data.image
            }
            className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full"
          />
          <p className="font-DungGeunMo text-gray-100 text-xl">[{postDetail?.author_data.nickname}]</p>
        </div>
        <span className="text-white text-xl">{postDetail?.create_dt.split("T")[0]}</span>
      </div>
    </>
  );
}
