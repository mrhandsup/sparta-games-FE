import Easy from "../../common/chipComponents/Easy";
import StarRating from "../../common/StarRating";

const ReviewCard = () => {
  return (
    <div className="flex flex-col gap-2 p-4 w-[342px] bg-gray-800 text-white rounded-lg">
      <div className="flex gap-[6px]">
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="flex flex-col gap-[6px]">
          <p className="text-title-18">[user name]</p>
          <StarRating score={8} />
        </div>
      </div>
      <div className="w-full h-[72px] text-body-14 line-clamp-4 text-ellipsis">
        Absolutely addictive gameplay! 남은 까닭이요 아직 나의 청춘이 다하지 않은 까닭입니다 위에 파란 잔디가 피어나듯이
        내 이름자 묻힌 언덕 계십니다 나는 무엇인지 그리워 이 많은 별빛이 내린 우는 벌레는 부끄러운 이름을 슬Absolutely
        addictive gameplay! 남은 까닭이요 아직 나의 청춘이 다하지 않은 까닭입니다 위에 파란 잔디가 피어나듯이 내 이름자
        묻힌 언덕 계십니다 나는 무엇인지 그리워 이 많은 별빛이 내린 우는 벌레는 부끄러운 이름을 슬
      </div>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-1 text-[11px] font-bold">
          <Easy gap={4} bg />
          <div className="flex gap-1 p-1 bg-gray-600 rounded">
            👍<p>100</p>
          </div>
          <div className="flex gap-1 p-1 bg-gray-600 rounded">
            👎<p>100</p>
          </div>
        </div>
        <p className="text-[12px] leading-4 text-gray-300">0000.00.00</p>
      </div>
    </div>
  );
};

export default ReviewCard;
