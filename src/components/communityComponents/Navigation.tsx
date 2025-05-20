import { useState } from "react";
import balloon from "../../assets/headerImage/balloon.svg";

const Navigation = () => {
  const [nav, setNav] = useState("팀원 모집");
  const onClickNavHandler = (arg: string) => {
    setNav(arg);
  };
  return (
    <nav className="flex items-center justify-between mx-auto mt-16 max-w-[1440px] font-DungGeunMo">
      <div className="flex gap-5 ">
        <div onClick={() => onClickNavHandler("팀원 모집")} className="text-3xl cursor-pointer">
          <p className={`${nav === "팀원 모집" ? "text-primary-400" : "text-white"}`}>팀원 모집</p>
        </div>
        <div onClick={() => onClickNavHandler("프로필 등록")} className="text-3xl cursor-pointer">
          <p className={`${nav === "프로필 등록" ? "text-primary-400" : "text-white"}`}>프로필 등록</p>
        </div>
      </div>

      <div className="flex gap-4 px-6 py-5 rounded-full bg-gray-800">
        <img src={balloon} alt="검색 아이콘" className="cursor-pointer hover:text-primary-500" />
        <p className="text-2xl text-white">제목 또는 글 내용 검색하기</p>
      </div>
    </nav>
  );
};

export default Navigation;
