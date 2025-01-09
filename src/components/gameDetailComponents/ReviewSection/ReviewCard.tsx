import DifficultyChip from "../../common/chipComponents/DifficultyChip";
import StarRating from "../../common/StarRating";
import reviewDetail from "../../../assets/gameDetail/ReviewDetail.svg";
import reviewEdit from "../../../assets/gameDetail/ReviewEdit.svg";
import reviewDelete from "../../../assets/gameDetail/ReviewDelete.svg";
import exampleProfile from "../../../assets/gameDetail/example_profile.png";
import { TReviewData } from "../../../types";
import { formatDate } from "../../../share/validation";

type reviewDataProps = {
  review: TReviewData | undefined;
  isMyReview?: boolean;
};

const ReviewCard = ({ review, isMyReview = false }: reviewDataProps) => {
  return (
    <div
      className={`relative flex flex-col gap-2 p-4 bg-gray-800 text-white rounded-xl ${
        isMyReview ? "border border-solid border-primary-500" : ""
      }`}
    >
      <div className="flex gap-2">
        <img src={exampleProfile} />
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center justify-between">
            {isMyReview ? (
              <>
                <p className="font-DungGeunMo text-lg text-primary-500">{review?.author_name}</p>
                <img className="absolute right-12 cursor-pointer" src={reviewEdit} alt="리뷰 수정" />
                <img className="absolute right-4 cursor-pointer" src={reviewDelete} alt="리뷰 삭제" />
              </>
            ) : (
              <>
                <p className="font-DungGeunMo text-lg">{review?.author_name}</p>
                <img className="absolute right-4 cursor-pointer" src={reviewDetail} alt="리뷰 상세 보기" />
              </>
            )}
          </div>
          <div className="flex gap-2">
            <DifficultyChip chipSize="small" difficultyLevel="EASY" />
            <StarRating score={review?.star} />
          </div>
        </div>
      </div>
      <div className="w-full h-[72px] text-body-14 line-clamp-4 text-ellipsis">{review?.content}</div>
      <div className="flex justify-between items-end">
        <p className="text-[12px] leading-4 text-gray-300">{formatDate(review?.created_at)}</p>
        <div className="flex items-center gap-1 text-[11px] font-bold">
          <div className="flex gap-1 p-1 bg-gray-600 rounded">
            👍<p>{review?.like_count}</p>
          </div>
          <div className="flex gap-1 p-1 bg-gray-600 rounded">
            👎<p>{review?.dislike_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
