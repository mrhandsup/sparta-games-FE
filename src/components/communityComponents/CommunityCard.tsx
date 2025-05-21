import defaultImage from "../../assets/category/Rhythm.png";
import defaultProfile from "../../assets/common/defaultProfile.svg";

export default function CommunityCard() {
  return (
    <section // key={item?.id}
      className=" relative h-[450px] border-gray-100 border-[0.7px] rounded-lg border-solid"
    >
      <img src={defaultImage} alt="썸네일" className="h-[55%] object-cover" />

      <div
        className="absolute top-0 left-0 bg-white rounded-tl-md rounded-br-lg font-DungGeunMo text-black py-1.5 px-4 w-fit font-light
      border-gray-100 border-b-[0.7px] border-r-[0.95px] border-solid
      "
      >
        모집중
      </div>

      <div className="px-4 py-6 h-[45%] bg-gray-800 text-white rounded-b-lg ">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-DungGeunMo text-black">
            <div className="px-2 py-1 rounded-[4px] bg-white">
              <p>Client</p>
            </div>
            <div className="px-2 py-1 rounded-[4px] bg-white">
              <p>Animator</p>
            </div>
            <div className="px-2 py-1 rounded-[4px] bg-white">
              <p>Director</p>
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
          <div className="my-4 text-heading-20 font-bold text-ellipsis overflow-hidden truncate">
            ㅇㅇ프로젝트 모집합니다다
          </div>

          <div className="flex items-center gap-2">
            <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
            <p className="font-bold text-white text-lg">작성자</p>
            <span className="text-gray-400 text-xl">|</span>
            <span className="text-white text-lg">2025.05.30까지</span>
          </div>
        </div>
      </div>
    </section>
  );
}
