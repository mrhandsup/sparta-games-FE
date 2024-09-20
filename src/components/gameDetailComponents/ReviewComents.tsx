import ReviewCard from "./ReviewCard";

const ReviewComents = () => {
  return (
    <section className="flex flex-col gap-5 mt-5 py-5">
      <div className="flex gap-3 text-[20px] font-semibold text-white">
        <p>최근 게시순</p>
        <p>공감 많은순</p>
        <p>비공감 많은 순</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
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
