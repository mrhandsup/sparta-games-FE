import ReviewCard from "./ReviewCard";
import reviewRegister from "../../../assets/gameDetail/reviewRegister.svg";
import ReviewRegisterModal from "./ReviewRegisterModal";
import { useState } from "react";
import { userStore } from "../../../share/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { TReviewResponse } from "../../../types";
import { sparta_games } from "../../../api/axios";

const ReviewComents = ({ gamePk }: { gamePk: number }) => {
  const { userData } = userStore();

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const { data } = useQuery<TReviewResponse>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await sparta_games.get(`/games/api/list/${gamePk}/reviews/`);
      return res.data;
    },
  });

  const reviewData = data?.results.all_reviews;
  const myReview = data?.results.my_review;

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
          {/* 로그인한 상태 */}
          {userData ? (
            // 내가 쓴 리뷰가 있을 떄
            !myReview ? (
              <>
                <div
                  onClick={handleModalOpen}
                  className="flex items-center justify-center gap-6 border border-solid border-primary-500 bg-gray-800 rounded-xl cursor-pointer"
                >
                  <img src={reviewRegister} />
                  <p className="text-white font-DungGeunMo text-2xl">내 리뷰 등록하기</p>
                </div>
              </>
            ) : (
              // 내가 쓴 리뷰가 없을 때
              <ReviewCard review={myReview} isMyReview={true} />
            )
          ) : (
            // 로그인 하지 않은 상태
            <div className="flex items-center justify-center gap-6 px-11 border border-solid border-alert-default hover:border-alert-hover bg-gray-800 rounded-xl">
              <img src={reviewRegister} />
              <p className="text-white font-DungGeunMo text-2xl text-center leading-none">
                비회원은 리뷰등록이 불가능합니다.
              </p>
            </div>
          )}

          {reviewData?.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      </section>
      <ReviewRegisterModal modalOpen={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ReviewComents;
