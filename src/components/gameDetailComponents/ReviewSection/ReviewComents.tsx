import ReviewCard from "./ReviewCard";
import reviewRegister from "../../../assets/gameDetail/reviewRegister.svg";
const ReviewComents = () => {
  return (
    <section className="flex flex-col gap-5 mt-5 py-5">
      <div className="flex gap-3 text-[20px] font-semibold text-white">
        <p>최근 게시순</p>
        <p>공감 많은순</p>
        <p>비공감 많은 순</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex items-center gap-6 p-11 w-[342px] border border-solid border-primary-500 bg-gray-800 rounded-lg">
          <img src={reviewRegister} />
          <p className="w-96 text-white font-DungGeunMo text-xl font-normal leading-8">내 리뷰 등록하기</p>
        </div>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </section>
  );
};

export default ReviewComents;
