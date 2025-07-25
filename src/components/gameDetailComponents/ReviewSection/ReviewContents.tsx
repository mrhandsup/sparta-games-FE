import ReviewCard from "./ReviewCard";
import reviewRegister from "../../../assets/gameDetail/reviewRegister.svg";
import ReviewRegisterModal from "./ReviewRegisterModal";
import { userStore } from "../../../share/store/userStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TReviewData, TReviewResponse } from "../../../types";
import { getGameMyReview, getGameReviews } from "../../../api/review";
import SpartaPagination from "../../../spartaDesignSystem/SpartaPagination";
import usePageHandler from "../../../hook/usePageHandler ";
import { useEffect, useMemo, useState } from "react";
import useModalToggle from "../../../hook/useModalToggle";

const ReviewContents = ({ gamePk }: { gamePk: number }) => {
  const COUNT_PER_PAGE = 6;

  const [reviewList, setReviewList] = useState<TReviewData[] | undefined>();
  const [selectedOrder, setSelectedOrder] = useState<"new" | "likes" | "dislikes">("new");
  const [isRegister, setIsRegister] = useState(false);

  const { userData } = userStore();
  const { currentPage, onChangePage } = usePageHandler();
  const { modalToggle, onClickModalToggleHandler } = useModalToggle();

  const queryClient = useQueryClient();

  const { data: allReviewData } = useQuery<TReviewResponse>({
    queryKey: ["reviews", currentPage, selectedOrder],
    queryFn: () =>
      userData
        ? getGameReviews(gamePk, currentPage, COUNT_PER_PAGE, selectedOrder, userData.data)
        : getGameReviews(gamePk, currentPage, COUNT_PER_PAGE, selectedOrder),
  });

  const { data: myReviewData } = useQuery<TReviewResponse>({
    queryKey: ["reviews", "my_review", gamePk],
    queryFn: () => getGameMyReview(gamePk, currentPage, COUNT_PER_PAGE),
    enabled: !!userData,
  });

  const allReviews = useMemo(() => {
    return allReviewData?.data.all_reviews ?? [];
  }, [allReviewData]);

  const myReview = myReviewData?.data.my_review ?? null;

  useEffect(() => {
    if (allReviews) {
      const reviewsWithoutMyReview = allReviews.filter((review) => review.id !== myReview?.id);
      setReviewList(reviewsWithoutMyReview);
    }
  }, [allReviews, myReview?.id]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["reviews"] });
  }, [myReviewData]);

  return (
    <>
      <section className="flex flex-col gap-3 mb-12">
        <div className="flex justify-between">
          <p className="text-3xl font-DungGeunMo text-white">Review</p>
          <div className="flex gap-3 text-xl font-semibold text-white">
            <p
              onClick={() => setSelectedOrder("new")}
              className={`cursor-pointer ${selectedOrder === "new" ? "text-primary-500" : "text-white"}`}
            >
              최근 게시순
            </p>
            <p
              onClick={() => setSelectedOrder("likes")}
              className={`cursor-pointer ${selectedOrder === "likes" ? "text-primary-500" : "text-white"}`}
            >
              공감 많은순
            </p>
            <p
              onClick={() => setSelectedOrder("dislikes")}
              className={`cursor-pointer ${selectedOrder === "dislikes" ? "text-primary-500" : "text-white"}`}
            >
              비공감 많은 순
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {currentPage === 1 &&
            (userData ? (
              !myReview ? (
                <div
                  onClick={() => {
                    onClickModalToggleHandler();
                    setIsRegister(true);
                  }}
                  className=" flex items-center justify-center gap-6 h-[245px] border border-solid border-primary-500 bg-gray-800 rounded-xl cursor-pointer"
                >
                  <img src={reviewRegister} />
                  <p className="text-white font-DungGeunMo text-2xl">내 리뷰 등록하기</p>
                </div>
              ) : (
                <ReviewCard
                  onClickModalToggleHandler={onClickModalToggleHandler}
                  review={myReview}
                  isMyReview={!!myReview}
                  setIsRegister={setIsRegister}
                />
              )
            ) : (
              <div className="flex items-center justify-center gap-6 px-11 h-[245px] border border-solid border-alert-default hover:border-alert-hover bg-gray-800 rounded-xl">
                <img src={reviewRegister} />
                <p className="text-white font-DungGeunMo text-2xl text-center leading-none">
                  비회원은 리뷰등록이 불가능합니다.
                </p>
              </div>
            ))}

          {reviewList?.map((review) => (
            <ReviewCard review={review} onClickModalToggleHandler={onClickModalToggleHandler} />
          ))}
        </div>
        <SpartaPagination
          dataTotalCount={allReviewData?.pagination.count}
          countPerPage={COUNT_PER_PAGE}
          onChangePage={onChangePage}
        />
      </section>

      <ReviewRegisterModal
        gamePk={gamePk}
        modalToggle={modalToggle}
        onClickModalToggleHandler={onClickModalToggleHandler}
        myReview={myReview}
        isRegister={isRegister}
      />
    </>
  );
};

export default ReviewContents;
