import moreAlarm from "../../assets/common/arrow/triangleArrowBottom.svg";

type props = {
  onClickModalToggleHandler: () => void;
};

const AlarmModal = ({ onClickModalToggleHandler }: props) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClickModalToggleHandler;
      }}
      className="absolute top-10 right-0 flex gap-5 py-5 px-2 w-[360px] h-[712px] bg-gray-800 border border-solid border-primary-500 shadow-primary rounded-[20px]"
    >
      <div className="w-full py-2 px-6">
        <h2 className="mb-8 text-xl text-white">
          알림 <span className="text-[19px]">00</span>
        </h2>

        <div className="pb-4 text-sm border-b border-solid border-[#262626]">
          <div className="flex justify-between items-center mb-2">
            <p>게임업로드</p>
            <span>0시간 전</span>
          </div>
          <p className="font-Pretendard">[검수등록]'게임제목'게임이 성공적으로 접수되었습니다.</p>
        </div>

        <button
          className="flex items-center justify-center gap-2 w-full px-4 py-2 
         border border-gray-100 rounded-lg 
         text-sm text-gray-200 
         hover:bg-gray-800 transition"
        >
          <span className="font-Pretendard">알림 더보기</span>
          <img src={moreAlarm} alt="알림 더보기" />
        </button>
      </div>
    </div>
  );
};

export default AlarmModal;
