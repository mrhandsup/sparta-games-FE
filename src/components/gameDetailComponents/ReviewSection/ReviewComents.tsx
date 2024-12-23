import ReviewCard from "./ReviewCard";
import reviewRegister from "../../../assets/gameDetail/reviewRegister.svg";
import ReviewRegisterModal from "./ReviewRegisterModal";
import { useState } from "react";

const ReviewComents = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-3xl font-DungGeunMo text-white">Review</p>
          <div className="flex gap-3 text-xl font-semibold text-white">
            <p>최근 게시순</p>
            <p>공감 많은순</p>
            <p>비공감 많은 순</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {/* TODO: 리뷰 api 적용 후 적절히 데이터 prps로 전달하기기 */}
          <div
            onClick={handleModalOpen}
            className="flex items-center justify-center gap-6 border border-solid border-primary-500 bg-gray-800 rounded-xl cursor-pointer"
          >
            <img src={reviewRegister} />
            <p className="text-white font-DungGeunMo text-2xl">내 리뷰 등록하기</p>
          </div>

          <div className="flex items-center justify-center gap-6 px-11 bg-gray-800 rounded-xl">
            <img src={reviewRegister} />
            <p className="text-white font-DungGeunMo text-2xl text-center leading-none">
              비회원은 리뷰등록이 불가능합니다.
            </p>
          </div>

          <ReviewCard myReview={true} />
          <ReviewCard myReview={false} />
          <ReviewCard myReview={false} />
          <ReviewCard myReview={false} />
          <ReviewCard myReview={false} />
        </div>
      </section>
      <ReviewRegisterModal modalOpen={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ReviewComents;
