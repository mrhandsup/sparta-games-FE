import { useState } from "react";
import { SetURLSearchParams, useNavigate } from "react-router-dom";

import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../../spartaDesignSystem/SpartaCheckBox";

import { TTeamBuildProfileListItem, TUserData } from "../../../types";

import { useRoleOptions } from "../../../hook/useRoleOptions";
import useModalToggles from "../../../hook/useModalToggles";

import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../spartaDesignSystem/SpartaReactionModal";

import ArrowButton from "../../../assets/common/arrow/triangleArrowBottom.svg";
import ArrowButtonFill from "../../../assets/common/arrow/triangleArrowBottomActive.svg";
import FilterReset from "../../../assets/communityImage/Reset.svg";
import deleteIcon from "../../../assets/common/DeleteIcon.svg";

type FilterCategory = "position" | "purpose" | "period";

interface SelectedFilter {
  category: FilterCategory;
  value: string;
  label: string;
}

type Props = {
  userData: TUserData | undefined;
  selectedTab: "teamRecruit" | "profileRegister";
  onClickDisplaySelectedTags: (category: FilterCategory, value: string, label: string) => void;
  selectedFilters: SelectedFilter[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilter[]>>;
  setSearchParams: SetURLSearchParams;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateSearchParams: (filters: SelectedFilter[], isRecruiting: boolean) => void;
  teamBuildProfilePosts: TTeamBuildProfileListItem[] | undefined;
};

const SearchFilter = ({
  userData,
  selectedTab,
  onClickDisplaySelectedTags,
  selectedFilters,
  setSelectedFilters,
  setSearchParams,
  isOpen,
  setIsOpen,
  updateSearchParams,
  teamBuildProfilePosts,
}: Props) => {
  const [filterCliked, setFilterCliked] = useState("");

  const navigate = useNavigate();

  const { roleOptions } = useRoleOptions();

  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    uploadWarning: {
      title: "잠시만요!",
      content:
        selectedTab === "profileRegister"
          ? "프로필 등록은 회원만 이용가능합니다."
          : "팀원 모집 글 등록은 회원만 이용가능합니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },

    hasProfileWarning: {
      title: "잠시만요!",
      content: "이미 팀빌딩 프로필이 존재합니다.",
      btn1: {
        text: "내 팀빌딩 프로필로 이동하기",
        onClick: () => {
          navigate(`/my-page/${userData?.user_id}?tab=teambuilding`);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      btn2: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },
  };

  // 단순 모달 데이터
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.gameupload,
  );

  const handleToggle = () => {
    setIsOpen((prev) => {
      const newRecruiting = !prev;

      // ✅ 모집중 변경 시 URL 동기화
      updateSearchParams(selectedFilters, newRecruiting);

      return newRecruiting;
    });
  };

  const onClickNavHandler = (filterName: string) => {
    setFilterCliked((prev) => (prev === filterName ? "" : filterName));
  };

  const hasProfile = teamBuildProfilePosts?.some((post) => {
    return post.author_data.id === userData?.user_id;
  });

  const onClickCreateButton = () => {
    if (!userData) {
      setNoActionModalData(noActionData.uploadWarning);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      return;
    }

    if (selectedTab === "teamRecruit") {
      navigate("/community/team-building/create");
      return;
    }

    if (selectedTab === "profileRegister") {
      if (hasProfile) {
        setNoActionModalData(noActionData.hasProfileWarning);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      } else {
        navigate("/community/team-building/profile/create");
      }
    }
  };

  const PROJECT_PURPOSE = [
    { id: 1, label: "포트폴리오", value: "PORTFOLIO" },
    { id: 2, label: "공모전", value: "CONTEST" },
    { id: 3, label: "스터디", value: "STUDY" },
    { id: 4, label: "상용화", value: "COMMERCIAL" },
  ];

  const PROJECT_PERIOD = [
    { id: 1, label: "3개월 이내", value: "3M" },
    { id: 2, label: "6개월 이내", value: "6M" },
    { id: 3, label: "1년 이내", value: "1Y" },
    { id: 4, label: "1년 이상", value: "GT1Y" },
  ];

  return (
    <>
      {selectedTab === "teamRecruit" ? (
        <div className="flex items-center gap-2 mt-12 mb-4">
          <SpartaCheckBox checked={isOpen} onClick={handleToggle} />
          <p className="font-DungGeunMo text-body-22 text-white">모집중</p>
        </div>
      ) : (
        <div className="mt-12 "></div>
      )}
      <div className="flex justify-between">
        <div className="flex items-center gap-8 cursor-pointer">
          <div onClick={() => onClickNavHandler("position")} className="flex gap-3 relative">
            <p
              className={`font-DungGeunMo text-body-22 ${
                filterCliked === "position" || selectedFilters.some((item) => item.category === "position")
                  ? "text-primary-400"
                  : "text-white"
              }`}
            >
              포지션
            </p>
            <img
              src={
                filterCliked === "position" || selectedFilters.some((item) => item.category === "position")
                  ? ArrowButtonFill
                  : ArrowButton
              }
              alt="포지션 목록 열기"
            />

            <div
              className={`${
                filterCliked === "position" ? "block" : "hidden"
              } absolute top-10  flex gap-5 p-4 bg-gray-700 rounded-md z-10`}
            >
              <div className="flex flex-col items-center w-[180px]">
                {roleOptions.map((item, id) => (
                  <p
                    onClick={() => onClickDisplaySelectedTags("position", item.value as string, item.label)}
                    key={id}
                    className="w-full p-2 font-DungGeunMo hover:bg-gray-800 text-white text-lg text-center"
                  >
                    {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div onClick={() => onClickNavHandler("purpose")} className="flex gap-3 relative">
            <p
              className={`font-DungGeunMo text-body-22 ${
                filterCliked === "purpose" || selectedFilters.some((item) => item.category === "purpose")
                  ? "text-primary-400"
                  : "text-white"
              }`}
            >
              프로젝트 목적
            </p>
            <img
              src={
                filterCliked === "purpose" || selectedFilters.some((item) => item.category === "purpose")
                  ? ArrowButtonFill
                  : ArrowButton
              }
              alt="프로젝트 목적 목록 열기"
            />

            <div
              className={`${
                filterCliked === "purpose" ? "block" : "hidden"
              } absolute top-10  flex gap-5 p-4 bg-gray-700 rounded-md z-10`}
            >
              <div className="flex flex-col items-center w-[180px]">
                {PROJECT_PURPOSE.map((item, id) => (
                  <p
                    onClick={() => onClickDisplaySelectedTags("purpose", item.value, item.label)}
                    key={id}
                    className="w-full p-2 font-DungGeunMo hover:bg-gray-800 text-white text-lg text-center"
                  >
                    {item.label}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div onClick={() => onClickNavHandler("period")} className="flex gap-3 relative">
            <p
              className={`font-DungGeunMo text-body-22 ${
                filterCliked === "period" || selectedFilters.some((item) => item.category === "period")
                  ? "text-primary-400"
                  : "text-white"
              }`}
            >
              {selectedTab === "teamRecruit" ? "참여 가능 기간" : "프로젝트 기간"}
            </p>
            <img
              src={
                filterCliked === "period" || selectedFilters.some((item) => item.category === "period")
                  ? ArrowButtonFill
                  : ArrowButton
              }
              alt="프로젝트 기간 목록 열기"
            />

            <div
              className={`${
                filterCliked === "period" ? "block" : "hidden"
              } absolute top-10  flex gap-5 p-4 bg-gray-700 rounded-md z-10`}
            >
              <div className="flex flex-col items-center w-[180px]">
                {PROJECT_PERIOD.map((item, id) => (
                  <p
                    onClick={() => onClickDisplaySelectedTags("period", item.value, item.label)}
                    key={id}
                    className="w-full p-2 font-DungGeunMo hover:bg-gray-800 text-white text-lg text-center"
                  >
                    {item.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div
            onClick={() => {
              setSelectedFilters([]);
              setSearchParams({});
            }}
            className="flex gap-2 cursor-pointer"
          >
            <img src={FilterReset} alt="필터 초기화" />
            <p className="font-DungGeunMo text-body-22 text-white">초기화</p>
          </div>
          <SpartaButton
            content="글 등록하기"
            type="filled"
            size="medium"
            customStyle="w-[200px]"
            onClick={onClickCreateButton}
          />
        </div>
      </div>

      {/* 필터링 태그 UI */}
      <div className="flex gap-3 mt-4 my-7">
        {selectedFilters.map((item) => (
          <div className="flex">
            <div key={`${item.category}-${item.value}`} className=" bg-white text-black px-3 py-1 rounded-md">
              <span className="text-lg font-medium">{item.label}</span>
            </div>
            <button
              className="text-lg text-white"
              onClick={() => onClickDisplaySelectedTags(item.category, item.value, item.label)}
            >
              <img className="w-8" src={deleteIcon} alt="태그 제거" />
            </button>
          </div>
        ))}
      </div>

      {noActionModalData && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
          title={noActionModalData.title || ""}
          content={noActionModalData.content || ""}
          btn1={{
            text: noActionModalData?.btn1?.text || "",
            onClick: noActionModalData?.btn1?.onClick || (() => {}),
          }}
          btn2={
            noActionModalData?.btn2 && {
              text: noActionModalData?.btn2?.text || "",
              onClick: noActionModalData?.btn2?.onClick || (() => {}),
            }
          }
          type={noActionModalData.type}
        />
      )}
    </>
  );
};

export default SearchFilter;
