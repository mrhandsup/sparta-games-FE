import heroImage from "../../../assets/communityImage/heroImage.png";
import defaultProfile from "../../../assets/common/defaultProfile.svg";

export default function RecommandedCard() {
  return (
    <div className="flex gap-5 p-6  mx-auto border border-solid border-gray-400 rounded-lg">
      <div className="relative w-full">
        <div className="absolute flex items-center justify-center w-16 h-5 rounded-tl-md rounded-br-md bg-white border border-solidborder-gray-400">
          <p className="font-DungGeunMo text-xs">모집중</p>
        </div>
        <img src={heroImage} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex  items-center gap-2 font-DungGeunMo">
          <div className="px-2 py-1 rounded-[4px] bg-white">
            <p>Client</p>
          </div>
          <div className="px-2 py-1 rounded-[4px] bg-white">
            <p>Animator</p>
          </div>
          <div className="px-2 py-1 rounded-[4px] bg-white">
            <p>Director</p>
          </div>
          <div className="px-2 py-1 rounded-[4px] bg-white">
            <p>Modeler</p>
          </div>
          <p className="text-white text-lg">+3</p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center px-1.5 py-1.5 bg-gray-100 text-black font-bold rounded-md text-[13px]">
            🔥 취업용 포트폴리오
          </div>
          <div className="flex items-center px-1.5 py-1.5 bg-gray-600 text-white font-bold rounded-md text-[13px]">
            6개월 이내
          </div>
        </div>

        <div className="">
          <p className="mb-2 font-bold text-lg text-white">ㅇㅇ프로젝트 모집합니다</p>
          <span className="line-clamp-2 text-white leading-5">
            내용은 최대 두 줄 까지만 보입니다. 내용은 최대 두 줄 까지만 보입니다. 내용은 최대 두 줄 까지만 보입니다.
            내용은 최대 두 줄 까지만 보입니다. 내용은 최대 두 줄 까지만 보입니다. 내용은 최대 두 줄 까지만 보입니다.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
          <p className="font-bold text-white text-lg">작성자</p>
          <span className="text-gray-400 text-xl">|</span>
          <span className="text-white text-lg">2025.05.30까지</span>
        </div>
      </div>
    </div>
  );
}
