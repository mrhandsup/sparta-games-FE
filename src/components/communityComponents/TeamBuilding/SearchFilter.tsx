import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import SpartaCheckBox from "../../../spartaDesignSystem/SpartaCheckBox";

import { ROLE_CHOICES } from "../../../constant/constant";

import ArrowButton from "../../../assets/common/arrow/triangleArrowBottom.svg";
import ArrowButtonFill from "../../../assets/common/arrow/triangleArrowBottomActive.svg";
import FilterReset from "../../../assets/communityImage/Reset.svg";
import deleteIcon from "../../../assets/common/DeleteIcon.svg";

type Props = {
  isProfileTab: boolean;
};
type FilterCategory = "position" | "purpose" | "period";

interface SelectedFilter {
  category: FilterCategory;
  value: string;
}

const SearchFilter = ({ isProfileTab }: Props) => {
  const [filterCliked, setFilterCliked] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const onClickNavHandler = (filterName: string) => {
    setFilterCliked((prev) => (prev === filterName ? "" : filterName));
  };

  const onClickDisplaySelectedTags = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => {
      const exists = prev.some((item) => item.category === category && item.value === value);

      // period는 하나만 선택 가능
      if (category === "period") {
        if (exists) {
          return prev.filter((item) => !(item.category === category && item.value === value));
        } else {
          return [...prev.filter((item) => item.category !== category), { category, value }];
        }
      }

      if (exists) {
        return prev.filter((item) => !(item.category === category && item.value === value));
      } else {
        return [...prev, { category, value }];
      }
    });
  };

  const PROJECT_PURPOSE = [
    { id: 1, value: "포트폴리오" },
    { id: 2, value: "공모전" },
    { id: 3, value: "스터디" },
    { id: 4, value: "상용화" },
  ];

  const PROJECT_PERIOD = [
    { id: 1, value: "3개월 이내" },
    { id: 2, value: "6개월 이내" },
    { id: 3, value: "1년 이내" },
    { id: 4, value: "1년 이상" },
  ];

  return (
    <>
      {!isProfileTab ? (
        <div className="flex items-center gap-2 mt-12 mb-4">
          <SpartaCheckBox checked={isChecked} onClick={handleToggle} />
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
                {ROLE_CHOICES.map((item, id) => (
                  <p
                    onClick={() => onClickDisplaySelectedTags("position", item.value as string)}
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
                    onClick={() => onClickDisplaySelectedTags("purpose", item.value)}
                    key={id}
                    className="w-full p-2 font-DungGeunMo hover:bg-gray-800 text-white text-lg text-center"
                  >
                    {item.value}
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
              {isProfileTab ? "참여 가능 기간" : "프로젝트 기간"}
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
                    onClick={() => onClickDisplaySelectedTags("period", item.value)}
                    key={id}
                    className="w-full p-2 font-DungGeunMo hover:bg-gray-800 text-white text-lg text-center"
                  >
                    {item.value}
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
            width="w-[200px]"
            onClick={() =>
              navigate(
                `${isProfileTab ? "/community/team-building/profile-create" : "/community/team-building/create"}`,
              )
            }
          />
        </div>
      </div>

      {/* 필터링 태그 UI */}
      <div className="flex gap-3 mt-4 my-7">
        {selectedFilters.map((item) => (
          <div className="flex">
            <div key={`${item.category}-${item.value}`} className=" bg-white text-black px-3 py-1 rounded-md">
              <span className="text-lg font-medium">{item.value}</span>
            </div>
            <button
              className="text-lg text-white"
              onClick={() => onClickDisplaySelectedTags(item.category, item.value)}
            >
              <img className="w-8" src={deleteIcon} alt="삭제" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchFilter;
