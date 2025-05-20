import ArrowButton from "../../assets/communityImage/ArrowBottom.svg";
import FilterReset from "../../assets/communityImage/Reset.svg";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";

const SearchFilter = () => {
  return (
    <div className="flex justify-between mt-14">
      <div className="flex items-center gap-8 cursor-pointer">
        <div className="flex gap-3">
          <p className="font-DungGeunMo text-body-22 text-white">포지션</p>
          <img src={ArrowButton} alt="포지션 목록 열기" />
        </div>
        <div className="flex gap-3">
          <p className="font-DungGeunMo text-body-22 text-white">프로젝트 목적</p>
          <img src={ArrowButton} alt="프로젝트 목적 목록 열기" />
        </div>
        <div className="flex gap-3">
          <p className="font-DungGeunMo text-body-22 text-white">프로젝트 기간</p>
          <img src={ArrowButton} alt="프로젝트 기간 목록 열기" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <img src={FilterReset} alt="필터 초기화" />
          <p className="font-DungGeunMo text-body-22 text-white">초기화</p>
        </div>
        <SpartaButton content="글 등록하기" type="filled" size="medium" width="w-[200px]" />
      </div>
    </div>
  );
};

export default SearchFilter;
