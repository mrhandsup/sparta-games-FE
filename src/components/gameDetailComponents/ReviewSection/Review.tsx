import ReviewComents from "./ReviewComents";

const Review = ({ gamePk }: { gamePk: number }) => {
  return (
    <section className="relative my-12">
      <ReviewComents gamePk={gamePk} />
      <div className="flex gap-8 my-5 mx-auto w-fit text-title-18 text-white"></div>
    </section>
  );
};

export default Review;
