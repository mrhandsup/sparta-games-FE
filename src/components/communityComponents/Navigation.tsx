import { useState } from "react";

const Navigation = () => {
  const [nav, setNav] = useState("전체보기");
  const onClickNavHandler = (arg: string) => {
    setNav(arg);
  };
  return (
    <nav className="flex px-[130px] mt-[94px]">
      <div
        onClick={() => onClickNavHandler("전체보기")}
        className={`flex justify-center items-center w-[181px] h-[61px] text-[22px] font-bold text-white rounded ${
          nav === "전체보기" && "bg-gray-600"
        }`}
      >
        전체보기
      </div>
      <div
        onClick={() => onClickNavHandler("디자인")}
        className={`flex justify-center items-center w-[181px] h-[61px] text-[22px] font-bold text-white rounded ${
          nav === "디자인" && "bg-gray-600"
        }`}
      >
        디자인
      </div>
      <div
        onClick={() => onClickNavHandler("개발")}
        className={`flex justify-center items-center w-[181px] h-[61px] text-[22px] font-bold text-white rounded ${
          nav === "개발" && "bg-gray-600"
        }`}
      >
        개발
      </div>
      <div
        onClick={() => onClickNavHandler("자유로운 이야기")}
        className={`flex justify-center items-center w-[181px] h-[61px] text-[22px] font-bold text-white rounded ${
          nav === "자유로운 이야기" && "bg-gray-600"
        }`}
      >
        자유로운 이야기
      </div>
    </nav>
  );
};

export default Navigation;
