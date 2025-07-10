import { useNavigate } from "react-router-dom";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import backIcon from "../../../../assets/common/arrow/triangleArrowLeft.svg";
import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import { TTeamBuildPostDetail, TUserData } from "../../../../types";

type Props = {
  userData: TUserData | undefined;
  postDetail: TTeamBuildPostDetail | undefined;
  onClickCloseRecruit: () => void;
  onClickDeleteRecruit: () => void;
};
export default function RecruitDetailHeader({
  userData,
  postDetail,
  onClickCloseRecruit,
  onClickDeleteRecruit,
}: Props) {
  const navigate = useNavigate();

  const isMyPost = userData?.user_id === postDetail?.author_data.id;

  return (
    <>
      <img onClick={() => window.history.back()} className="my-6 cursor-pointer" src={backIcon} alt="뒤로가기" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 font-DungGeunMo">
          <p className="w-[80px] p-1 text-center text-black text-[17px] rounded-[4px] bg-white whitespace-nowrap">
            {postDetail?.status_chip}
          </p>
          <p className="w-full line-clamp-3 text-white text-3xl tracking-[-0.5px]">{postDetail?.title}</p>
        </div>

        <div className="flex justify-end gap-2 ms-2">
          {isMyPost && (
            <>
              <SpartaButton
                content="마감"
                size="small"
                colorType="grey"
                customStyle={`${
                  postDetail?.status_chip === "모집마감" ? "hidden" : "block"
                }  px-6 !rounded-sm !h-8 hover:text-alert-default hover:border-alert-default whitespace-nowrap`}
                onClick={onClickCloseRecruit}
              />

              <SpartaButton
                content="수정"
                size="small"
                colorType="grey"
                customStyle="px-6 !rounded-sm !h-8 hover:text-alert-default hover:border-alert-default whitespace-nowrap"
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
                customStyle="px-6 !rounded-sm  !h-8 hover:text-error-default hover:border-error-default whitespace-nowrap"
                onClick={onClickDeleteRecruit}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <div className="flex items-center gap-2">
          <img
            src={
              postDetail?.author_data.image === null
                ? defaultProfile
                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + postDetail?.author_data.image
                : postDetail?.author_data.image
            }
            className="w-6 h-6 border-[1px] border-solid border-gray-400 rounded-full"
          />
          <p className="font-DungGeunMo text-gray-100 text-lg">{postDetail?.author_data.nickname}</p>
        </div>
        <span className="text-white text-lg">{postDetail?.create_dt.split("T")[0].split("-").join(".")}</span>
      </div>
    </>
  );
}
