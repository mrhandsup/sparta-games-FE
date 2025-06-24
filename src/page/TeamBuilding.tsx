import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SearchFilter from "../components/communityComponents/TeamBuilding/SearchFilter";
import SpartaPagination from "../spartaDesignSystem/SpartaPagination";
import SpartaTabNav from "../spartaDesignSystem/SpartaTabNav";

import Hero from "../components/communityComponents/TeamBuilding/Hero";
import RecommandedCard from "../components/communityComponents/TeamBuilding/RecommandedCard";
import CardList from "../components/communityComponents/TeamBuilding/TeamRecruit/CardList";

import { getTeamBuild } from "../api/teambuilding";
import { TTeamBuildPostResponse } from "../types";
import { userStore } from "../share/store/userStore";
import usePageHandler from "../hook/usePageHandler ";

import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import balloon from "../assets/headerImage/balloon.svg";

type TabValue = "teamRecruit" | "profileRegister";

type FilterCategory = "position" | "purpose" | "period";

interface SelectedFilter {
  category: FilterCategory;
  value: string;
  label: string;
}
const TAB_LABELS: Record<TabValue, string> = {
  teamRecruit: "팀원 모집",
  profileRegister: "프로필 등록",
};

export default function TeamBuilding() {
  const COUNT_PER_PAGE = 12;

  const [selectedTab, setSelectedTab] = useState<TabValue>("teamRecruit");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const { userData } = userStore();
  const { currentPage, onChangePage } = usePageHandler();

  const openParam = isOpen ? "open" : "";
  const params = new URLSearchParams();

  selectedFilters.forEach((filter) => {
    if (filter.category === "position") params.append("roles", filter.value);
    if (filter.category === "purpose") params.append("purpose", filter.value);
    if (filter.category === "period") params.append("duration", filter.value);
  });

  params.append("status_chip", openParam);
  params.append("page", String(currentPage));
  params.append("limit", String(COUNT_PER_PAGE));

  const { data } = useQuery<TTeamBuildPostResponse>({
    queryKey: ["teamBuilding", currentPage, params.toString()],
    queryFn: () => getTeamBuild(userData?.data.user_id, params),
  });

  const teamBuildPosts = data?.data.team_build_posts;
  const recommandedPosts = data?.data.recommended_posts;

  const updateSearchParams = (filters: SelectedFilter[], isOpen: boolean) => {
    const queryParams = new URLSearchParams();

    // 필터 값 추가
    filters.forEach((item) => {
      queryParams.append(item.category, item.value);
    });

    // 모집중 추가
    if (isOpen) {
      queryParams.append("status_chip", "open");
    }

    setSearchParams(queryParams);
  };

  const onClickDisplaySelectedTags = (category: FilterCategory, value: string, label: string) => {
    setSelectedFilters((prev) => {
      const exists = prev.some((item) => item.category === category && item.value === value);

      let newFilters;

      // period는 하나만 선택 가능
      if (category === "period") {
        if (exists) {
          newFilters = prev.filter((item) => !(item.category === category && item.value === value));
        } else {
          newFilters = [...prev.filter((item) => item.category !== category), { category, value, label }];
        }

        updateSearchParams(newFilters, isOpen);
        return newFilters;
      }

      if (exists) {
        newFilters = prev.filter((item) => !(item.category === category && item.value === value));
      } else {
        newFilters = [...prev, { category, value, label }];
      }

      updateSearchParams(newFilters, isOpen);
      return newFilters;
    });
  };

  const handleSearchTeamBuild = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
  };

  const filteredPosts =
    searchKeyword.trim() === ""
      ? teamBuildPosts || []
      : (teamBuildPosts || []).filter((post) => post.title.includes(searchKeyword));

  return (
    <main>
      <div className="bg-gray-800 w-full">
        <Hero />
      </div>
      <div className="mx-auto mt-16 max-w-[1440px]">
        <div className="flex flex-col gap-8">
          <p className="flex justify-between items-center text-5xl font-bold">
            <div className="flex items-center gap-3">
              <img src={pixelMeteor} />
              <p className="font-DungGeunMo text-[32px] font-[400] text-white">추천 게시글</p>
            </div>
          </p>
          <div className="grid grid-cols-2 gap-5">
            {recommandedPosts?.map((post) => (
              <RecommandedCard post={post} />
            ))}
          </div>
        </div>

        {/* 팀원모집/ 프로필 선택, 검색 영역 */}
        <div className="flex items-center justify-between mx-auto mt-16 max-w-[1440px]">
          <SpartaTabNav selectedTab={selectedTab} onTabChange={setSelectedTab} tabLabels={TAB_LABELS} />
          <div className="flex gap-4 px-6 py-5 rounded-full bg-gray-800">
            <img src={balloon} alt="검색 아이콘" />
            <input
              onChange={handleSearchTeamBuild}
              type="text"
              placeholder="제목 또는 글 내용 검색하기"
              className="bg-gray-800 text-2xl text-white"
            />
          </div>
        </div>

        {/* 필터링, 글 등록 영역 */}
        <SearchFilter
          userData={userData?.data}
          isProfileTab={selectedTab === "profileRegister"}
          onClickDisplaySelectedTags={onClickDisplaySelectedTags}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          setSearchParams={setSearchParams}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateSearchParams={updateSearchParams}
        />

        {/* 포스트 리스트 영역 */}
        <div className="grid grid-cols-4 gap-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <CardList key={post.id} post={post} isProfileTab={selectedTab === "profileRegister"} />
            ))
          ) : (
            <div className="col-span-4 font-DungGeunMo text-2xl text-center text-white">검색 결과가 없습니다.</div>
          )}
        </div>

        {teamBuildPosts?.length === 0 && (
          <div className="flex justify-center pt-10">
            <p className="font-DungGeunMo text-2xl text-white">조건에 해당하는 모집글이 없습니다.</p>
          </div>
        )}

        <div className="mt-10">
          <SpartaPagination
            dataTotalCount={data?.pagination.count}
            countPerPage={COUNT_PER_PAGE}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </main>
  );
}
