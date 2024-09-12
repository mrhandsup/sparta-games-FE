const CommunityCard = () => {
  return (
    <div className="flex w-[580px]">
      <img className="w-[190px] h-[152px] bg-gray-200" />
      <div className="flex flex-col gap-3 p-4 w-[389px]">
        <div className="flex justify-between">
          <p className="text-title-14 text-gray-200">자유로운 이야기</p>
          <p className="flex gap-1 text-[11px] font-bold text-center text-white">
            <p className="p-1 bg-gray-600 rounded">👍100</p>
            <p className="p-1 bg-gray-600 rounded">💭100</p>
          </p>
        </div>
        <div className="h-16 overflow-hidden whitespace-nowrap text-ellipsis text-heading-20 text-white">
          테스트 아아 출근하기 싫다 테스트 아아 출근하기 싫다테스트 아아 출근하기 싫다
        </div>
        <div className="flex justify-between">
          <p className="w-44 overflow-hidden whitespace-nowrap text-ellipsis text-body-14 text-gray-200">이름</p>
          <p className="text-body-14 text-gray-200">09.20.24 11:00PM</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
