import { useState } from "react";
import ReviewComents from "./ReviewComents";
import { Pagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Review = ({ gamePk }: { gamePk: number }) => {
  return (
    <section className="relative my-12">
      <ReviewComents gamePk={gamePk} />
      <div className="flex gap-8 my-5 mx-auto w-fit text-title-18 text-white"></div>
      <div className="flex justify-center">
        <Pagination
          count={10}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </div>
    </section>
  );
};

export default Review;
