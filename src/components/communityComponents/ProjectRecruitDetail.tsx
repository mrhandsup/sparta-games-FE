import { useState } from "react";

import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import defaultProfile from "../../assets/common/defaultProfile.svg";
import exampleImage from "../../assets/category/Survival.png";
import backIcon from "../../assets/common/arrow/triangleArrowLeft.svg";
import SpartaTabNav from "../../spartaDesignSystem/SpartaTabNav";

type SortTab = "recent" | "oldest";

const SORT_LABELS: Record<SortTab, string> = {
  recent: "최신순",
  oldest: "오래된 순",
};

export default function ProjectRecruitDetail() {
  const [sortTab, setSortTab] = useState<SortTab>("recent");

  return (
    <div className="w-[1180px] mx-auto">
      <img onClick={() => window.history.back()} className="my-6 cursor-pointer" src={backIcon} alt="뒤로가기" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="px-2 py-1 rounded-[4px] font-DungGeunMo text-black bg-white">
            <p>모집중</p>
          </div>
          <p className="font-DungGeunMo text-white text-2xl">ㅇㅇ게임즈 팀원 구합니다</p>
        </div>

        <div className="flex gap-3 w-[300px]">
          <SpartaButton content="마감" size="small" colorType="grey" />
          <SpartaButton content="수정" size="small" colorType="grey" />
          <SpartaButton content="삭제" size="small" colorType="grey" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <div className="flex items-center gap-1">
          <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
          <p className="font-DungGeunMo text-gray-100 text-xl">[작성자명]</p>
        </div>
        <span className="text-white text-xl">2025.05.30</span>
      </div>
      <div className="mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
        <img className="h-[500px] object-cover rounded-lg" src={exampleImage} alt="프로젝트 이미지" />

        <p className="mt-10 font-DungGeunMo text-xl text-primary-400">프로젝트 정보</p>
        <hr className="border-t border-gray-400 my-3" />

        <div className="flex mt-5">
          <div className="flex flex-col gap-4">
            <div className="flex gap-12">
              <p className="text-white text-sm">구하는 포지션</p>

              <div className="flex flex-wrap  gap-2 w-[250px]">
                <div className="px-2 py-1 rounded-[4px] bg-white max-w-[30%]">
                  <p>Client</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white max-w-[30%]">
                  <p>Animator</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white max-w-[30%]">
                  <p>Director</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white max-w-[30%]">
                  <p>Longer Position Name</p>
                </div>
              </div>
            </div>

            <div className="flex gap-[74px]">
              <p className="text-white text-sm">마감기한</p>
              <span className="text-white">2025-05-30</span>
            </div>

            <div className="flex gap-[74px]">
              <p className="text-white text-sm">연락방법</p>
              <span className="w-[200px] truncate text-white underline">http://kakaotalk.12345678.12345678</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-12">
              <p className="text-white text-sm">프로젝트 목적</p>
              <span className="text-white font-bold text-sm">포트폴리오</span>
            </div>

            <div className="flex gap-12">
              <p className="text-white text-sm">프로젝트 기간</p>
              <span className="text-white font-bold text-sm">3개월 이내</span>
            </div>

            <div className="flex gap-[76px]">
              <p className="text-white text-sm">진행방식</p>
              <span className="text-white font-bold text-sm">온라인</span>
            </div>
          </div>
        </div>

        <p className="mt-10 font-DungGeunMo text-xl text-primary-400">상세내용</p>
        <hr className="border-t border-gray-400 my-3" />
        <p className="text-sm text-gray-100 leading-5">
          안녕하세요 이런 프로젝트를 하려고 합니다. <br />
          프로젝트의 게임 분야 (FPS, RPG 등)
          <br />
          프로젝트를 시작하게 된 배경
          <br />
          프로젝트의 목표
          <br />
          프로젝트에 할애할 수 있는 시간
          <br />
          그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등) <br />
          우리 팀의 분위기와 강점 (이미 합류한 팀원이 있다면 적어주세요.) <br />
          프로젝트 관련 주의사항 00개월 동안 같이 참여할 00팀원을 구합니다. 연락주세요.
          <br />
          00개월 동안 같이 참여할 00팀원을 구합니다.
          <br />
          연락주세요.
        </p>
      </div>

      {/* 댓글 부분 */}
      <div className=" mb-10 p-9 bg-gray-800 rounded-xl">
        <SpartaTabNav selectedTab={sortTab} onTabChange={setSortTab} tabLabels={SORT_LABELS} />
      </div>
    </div>
  );
}
