import { useState } from "react";
import ReviewComents from "./ReviewComents";
import { Pagination } from "@mui/material";

const Review = ({ gamePk }: { gamePk: number }) => {
  return (
    <section className="relative my-12">
      <ReviewComents gamePk={gamePk} />
      <div className="flex gap-8 my-5 mx-auto w-fit text-title-18 text-white"></div>
      <Pagination count={10} shape="rounded" />
    </section>
  );
};

export default Review;
