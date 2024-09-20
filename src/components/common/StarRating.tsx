import star from "../../assets/star.svg"; // 빈 별 컴포넌트
import halfFillStar from "../../assets/halfFillStar.svg"; // 반만 채워진 별 컴포넌트
import fillStar from "../../assets/fillStar.svg"; // 꽉 채워진 별 컴포넌트

const StarRating = ({ score }: { score: number }) => {
  // 별점 계산 (10점 만점 -> 5개의 별로 변환)
  const fullStars = Math.floor(score / 2); // 꽉 찬 별 개수
  const halfStar = score % 2 !== 0; // 반만 찬 별 여부
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 나머지는 빈 별

  return (
    <div className="flex gap-[2px]">
      {/* 꽉 찬 별 렌더링 */}
      {Array.from({ length: fullStars }, (_, index) => (
        <img key={index} src={fillStar} />
      ))}

      {/* 반만 찬 별 렌더링 */}
      {halfStar && <img src={halfFillStar} />}

      {/* 빈 별 렌더링 */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <img key={index} src={star} />
      ))}
    </div>
  );
};

export default StarRating;
