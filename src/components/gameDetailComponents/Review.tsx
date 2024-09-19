import ReviewForm from "./ReviewForm";

const Review = () => {
  return (
    <section className="my-12">
      <p className="font-DungGeunMo text-[32px] text-white">Review</p>
      {/* 로그인/회원가입 구현 후 유저정보가 있을경우 리뷰폼이 나오게 변경 */}
      <ReviewForm />
    </section>
  );
};

export default Review;
