import DifficultyChip from "../../common/chipComponents/DifficultyChip";
import StarRating from "../../common/StarRating";
import reviewDetail from "../../../assets/gameDetail/ReviewDetail.svg";
import reviewEdit from "../../../assets/gameDetail/ReviewEdit.svg";
import reviewDelete from "../../../assets/gameDetail/ReviewDelete.svg";
import exampleProfile from "../../../assets/gameDetail/example_profile.png";

const ReviewCard = ({ myReview }: { myReview: boolean }) => {
  return (
    <div
      className={`relative flex flex-col gap-2 p-4 bg-gray-800 text-white rounded-xl ${
        myReview ? "border border-solid border-primary-500" : ""
      }`}
    >
      <div className="flex gap-2">
        <img src={exampleProfile} />
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center justify-between">
            {myReview ? (
              <>
                <p className="font-DungGeunMo text-lg text-primary-500">[user_name]</p>
                <img className="absolute right-12 cursor-pointer" src={reviewEdit} />
                <img className="absolute right-4 cursor-pointer" src={reviewDelete} />
              </>
            ) : (
              <>
                <p className="font-DungGeunMo text-lg">다른유저입니다</p>
                <img className="absolute right-4 cursor-pointer" src={reviewDetail} />
              </>
            )}
          </div>
          <div className="flex gap-2">
            <DifficultyChip chipSize="small" difficultyLevel="EASY" />
            <StarRating score={0} />
          </div>
        </div>
      </div>
      <div className="w-full h-[72px] text-body-14 line-clamp-4 text-ellipsis">
        Absolutely addictive gameplay! 남은 까닭이요 아직 나의 청춘이 다하지 않은 까닭입니다 위에 파란 잔디가 피어나듯이
        내 이름자 묻힌 언덕 계십니다 나는 무엇인지 그리워 이 많은 별빛이 내린 우는 벌레는 부끄러운 이름을 슬Absolutely
        addictive gameplay! 남은 까닭이요 아직 나의 청춘이 다하지 않은 까닭입니다 위에 파란 잔디가 피어나듯이 내 이름자
        묻힌 언덕 계십니다 나는 무엇인지 그리워 이 많은 별빛이 내린 우는 벌레는 부끄러운 이름을 슬
      </div>
      <div className="flex justify-between items-end">
        <p className="text-[12px] leading-4 text-gray-300">0000.00.00</p>
        <div className="flex items-center gap-1 text-[11px] font-bold">
          <div className="flex gap-1 p-1 bg-gray-600 rounded">
            👍<p>100</p>
          </div>
          <div className="flex gap-1 p-1 bg-gray-600 rounded">
            👎<p>100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
