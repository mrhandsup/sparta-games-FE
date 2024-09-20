import ReviewForm from "./ReviewForm";
import ReviewComents from "./ReviewComents";

const Review = () => {
  return (
    <section className="my-12">
      <p className="font-DungGeunMo text-[32px] text-white">Review</p>
      <ReviewForm />
      <ReviewComents />
    </section>
  );
};

export default Review;
