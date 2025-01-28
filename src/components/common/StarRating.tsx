import star from "../../assets/star.svg";
import halfFillStar from "../../assets/halfFillStar.svg";
import fillStar from "../../assets/fillStar.svg";

type Props = {
  score: number | undefined;
};

const StarRating = ({ score = 0 }: Props) => {
  // 별점 계산 (5점 만점)
  const fullStars = Math.floor(score); // 꽉 찬 별 개수
  const halfStar = score % 1 !== 0; // 반만 찬 별 여부
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 나머지는 빈 별

  return (
    <div className="flex gap-[2px] items-center">
      {/* 꽉 찬 별 렌더링 */}
      {Array.from({ length: fullStars }, (_, index) => (
        <img key={index} src={fillStar} className="w-4" />
      ))}

      {/* 반만 찬 별 렌더링 */}
      {halfStar && <img src={halfFillStar} className="w-4" />}

      {/* 빈 별 렌더링 */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <img key={index} src={star} className="w-4" />
      ))}
    </div>
  );
};

export default StarRating;
