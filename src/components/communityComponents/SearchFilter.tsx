import { useState } from "react";

const SearchFilter = () => {
  const [check, setCheck] = useState("");

  const onClickCheckHandler = (arg: string) => {
    if (check === arg) {
      setCheck("");
      return;
    }
    setCheck(arg);
  };

  return (
    <section className="flex gap-3 mt-[75px] px-[130px]">
      <div className="flex gap-5">
        <p
          onClick={() => onClickCheckHandler("최근 게시순")}
          className={`text-body-22 text-white cursor-pointer ${check === "최근 게시순" && "text-title-22"}`}
        >
          최근 게시순
        </p>
        <p
          onClick={() => onClickCheckHandler("공감 많은순")}
          className={`text-body-22 text-white cursor-pointer ${check === "공감 많은순" && "text-title-22"}`}
        >
          공감 많은순
        </p>
        <p
          onClick={() => onClickCheckHandler("댓글 많은 순")}
          className={`text-body-22 text-white cursor-pointer ${check === "댓글 많은 순" && "text-title-22"}`}
        >
          댓글 많은 순
        </p>
        {/* 로그인 구현 후 로그인된 유저의 경우 밑의 나의 게시글 필터가 활성화되게 변경 */}
        {/* <p>나의 게시글</p> */}
      </div>
      <div></div>
    </section>
  );
};

export default SearchFilter;
