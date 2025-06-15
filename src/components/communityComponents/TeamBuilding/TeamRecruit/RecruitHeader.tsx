import { useNavigate } from "react-router-dom";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import backIcon from "../../../../assets/common/arrow/triangleArrowLeft.svg";
import defaultProfile from "../../../../assets/common/defaultProfile.svg";

type Props = {
  onClickCloseRecruit: () => void;
  onClickDeleteRecruit: () => void;
};
export default function RecruitHeader({ onClickCloseRecruit, onClickDeleteRecruit }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <img onClick={() => window.history.back()} className="my-6 cursor-pointer" src={backIcon} alt="뒤로가기" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="px-2 py-1 rounded-[4px] font-DungGeunMo text-black bg-white">
            <p>모집중</p>
          </div>
          <p className="font-DungGeunMo text-white text-2xl">ㅇㅇ게임즈 팀원 구합니다</p>
        </div>

        <div className="flex gap-3 w-[300px]">
          <SpartaButton
            content="마감"
            size="small"
            colorType="grey"
            customStyle="w-full hover:text-alert-default hover:border-alert-default"
            onClick={onClickCloseRecruit}
          />

          <SpartaButton
            content="수정"
            size="small"
            colorType="grey"
            customStyle="w-full hover:text-alert-default hover:border-alert-default"
            onClick={() => navigate("/community/team-building/team-recruit/edit/1")}
          />
          <SpartaButton
            content="삭제"
            size="small"
            colorType="grey"
            customStyle="w-full hover:text-error-default hover:border-error-default"
            onClick={onClickDeleteRecruit}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <div className="flex items-center gap-1">
          <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
          <p className="font-DungGeunMo text-gray-100 text-xl">[작성자명]</p>
        </div>
        <span className="text-white text-xl">2025.05.30</span>
      </div>
    </>
  );
}
