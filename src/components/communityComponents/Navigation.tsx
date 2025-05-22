import balloon from "../../assets/headerImage/balloon.svg";

type NavigationProps = {
  selectedTab: "팀원 모집" | "프로필 등록";
  onTabChange: (tab: "팀원 모집" | "프로필 등록") => void;
};
const Navigation = ({ selectedTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="flex items-center justify-between mx-auto mt-16 max-w-[1440px] font-DungGeunMo">
      <div className="flex gap-5 ">
        <div onClick={() => onTabChange("팀원 모집")} className="text-3xl cursor-pointer">
          <p className={`${selectedTab === "팀원 모집" ? "text-primary-400" : "text-white"}`}>팀원 모집</p>
        </div>
        <div onClick={() => onTabChange("프로필 등록")} className="text-3xl cursor-pointer">
          <p className={`${selectedTab === "프로필 등록" ? "text-primary-400" : "text-white"}`}>프로필 등록</p>
        </div>
      </div>

      <div className="flex gap-4 px-6 py-5 rounded-full bg-gray-800">
        <img src={balloon} alt="검색 아이콘" className="cursor-pointer hover:text-primary-500" />
        <input type="text" placeholder="제목 또는 글 내용 검색하기" className="bg-gray-800 text-2xl text-white" />
      </div>
    </nav>
  );
};

export default Navigation;
