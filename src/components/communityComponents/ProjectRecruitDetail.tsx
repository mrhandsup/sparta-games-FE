import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SpartaTabNav from "../../spartaDesignSystem/SpartaTabNav";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";

import defaultProfile from "../../assets/common/defaultProfile.svg";
import exampleImage from "../../assets/category/Survival.png";
import backIcon from "../../assets/common/arrow/triangleArrowLeft.svg";
import SpartaPagination from "../../spartaDesignSystem/SpartaPagination";

type SortTab = "recent" | "oldest";

const SORT_LABELS: Record<SortTab, string> = {
  recent: "최신순",
  oldest: "오래된 순",
};

export default function ProjectRecruitDetail() {
  const [sortTab, setSortTab] = useState<SortTab>("recent");
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => console.log(data);

  const onClickCommentEdit = () => {
    setIsEdit(true);
  };

  const onClickCommentEditCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className="w-[1180px] mx-auto">
      <img onClick={() => window.history.back()} className="my-6 cursor-pointer" src={backIcon} alt="뒤로가기" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="px-2 py-1 rounded-[4px] font-DungGeunMo text-black bg-white">
            <p>모집중</p>
          </div>
          <p className="font-DungGeunMo text-white text-2xl">ㅇㅇ게임즈 팀원 구합니다</p>
        </div>

        <div className="flex gap-3 w-[300px]">
          <SpartaButton content="마감" size="small" colorType="grey" />
          <SpartaButton content="수정" size="small" colorType="grey" />
          <SpartaButton content="삭제" size="small" colorType="grey" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <div className="flex items-center gap-1">
          <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
          <p className="font-DungGeunMo text-gray-100 text-xl">[작성자명]</p>
        </div>
        <span className="text-white text-xl">2025.05.30</span>
      </div>
      <div className="mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
        <img className="h-[500px] object-cover rounded-lg" src={exampleImage} alt="프로젝트 이미지" />

        <p className="mt-10 font-DungGeunMo text-xl text-primary-400">프로젝트 정보</p>
        <hr className="border-t border-gray-400 my-3" />

        <div className="flex mt-5">
          <div className="flex flex-col gap-4">
            <div className="flex gap-12">
              <p className="text-white text-sm">구하는 포지션</p>

              <div className="flex flex-wrap gap-2 w-[250px] whitespace-nowrap">
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>Client</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>Animator</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>Director</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>Longer Position Name</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>Client</p>
                </div>
                <div className="px-2 py-1 rounded-[4px] bg-white ">
                  <p>Animator</p>
                </div>
              </div>
            </div>

            <div className="flex gap-[74px]">
              <p className="text-white text-sm">마감기한</p>
              <span className="text-white">2025-05-30</span>
            </div>

            <div className="flex gap-[74px]">
              <p className="text-white text-sm">연락방법</p>
              <span className="w-[200px] truncate text-white underline">http://kakaotalk.12345678.12345678</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 ms-44">
            <div className="flex gap-12">
              <p className="text-white text-sm">프로젝트 목적</p>
              <span className="text-white font-bold text-sm">포트폴리오</span>
            </div>

            <div className="flex gap-12">
              <p className="text-white text-sm">프로젝트 기간</p>
              <span className="text-white font-bold text-sm">3개월 이내</span>
            </div>

            <div className="flex gap-[76px]">
              <p className="text-white text-sm">진행방식</p>
              <span className="text-white font-bold text-sm">온라인</span>
            </div>
          </div>
        </div>

        <p className="mt-10 font-DungGeunMo text-xl text-primary-400">상세내용</p>
        <hr className="border-t border-gray-400 my-3" />
        <p className="text-sm text-gray-100 leading-5">
          안녕하세요 이런 프로젝트를 하려고 합니다. <br />
          프로젝트의 게임 분야 (FPS, RPG 등)
          <br />
          프로젝트를 시작하게 된 배경
          <br />
          프로젝트의 목표
          <br />
          프로젝트에 할애할 수 있는 시간
          <br />
          그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등) <br />
          우리 팀의 분위기와 강점 (이미 합류한 팀원이 있다면 적어주세요.) <br />
          프로젝트 관련 주의사항 00개월 동안 같이 참여할 00팀원을 구합니다. 연락주세요.
          <br />
          00개월 동안 같이 참여할 00팀원을 구합니다.
          <br />
          연락주세요.
        </p>
      </div>

      {/* 댓글 부분 */}
      <div className="gap-3 mb-10 p-9 bg-gray-800 rounded-xl">
        <SpartaTabNav selectedTab={sortTab} onTabChange={setSortTab} tabLabels={SORT_LABELS} />

        <div className="flex items-center gap-3 mt-10 mb-4 font-DungGeunMo text-white">
          <p className="text-3xl">댓글</p>
          <span className="text-3xl">8</span>
          {watch("content")?.length > 1000 ? (
            <p className=" text-error-default text-lg">*1000자 이내로 작성해주세요.</p>
          ) : (
            ""
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div
            className={`border border-solid ${
              watch("content")?.length > 1000
                ? "border-error-default"
                : watch("content")?.length > 0
                ? "border-primary-500"
                : "border-gray-400"
            } p-2 m-h-32 rounded-lg`}
          >
            <textarea
              maxLength={1000}
              placeholder="댓글을 입력해주세요"
              {...register("content")}
              className="p-2 w-full h-32 text-lg leading-tight text-white bg-transparent outline-none resize-none placeholder-gray-100"
              style={{ minHeight: "8rem", overflowY: "hidden" }}
              onInput={(e) => {
                const target = e.currentTarget;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
            />
          </div>
          <p
            className={`w-full mt-3 mb-4 ${
              watch("content")?.length > 1000 ? "text-error-default" : "text-gray-100"
            }  text-right`}
          >
            {watch("content")?.length}/1000
          </p>

          <div className="mt-2 text-right">
            <SpartaButton content="댓글 등록하기" type="filled" size="small" width="w-[180px]" />
          </div>
        </form>

        {/* 내 댓글 수정하기 */}

        {isEdit ? (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10">
            <div
              className={`border border-solid ${
                watch("content-edit")?.length > 1000 ? "border-error-default" : "border-gray-400"
              } p-4 m-h-32 rounded-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
                  <p className="font-bold text-white text-lg">작성자</p>
                  {watch("content-edit")?.length > 1000 ? (
                    <p className=" text-error-default text-sm">*1000자 이내로 작성해주세요.</p>
                  ) : (
                    ""
                  )}
                  <span className={`${isEdit ? "hidden" : "block"} text-gray-400 text-xl`}>|</span>
                  <span className={`${isEdit ? "hidden" : "block"} text-white text-lg`}>1시간 전</span>
                </div>
                <div className="flex gap-2">
                  <SpartaButton
                    onClick={onClickCommentEdit}
                    content={isEdit ? "수정완료" : "수정"}
                    size="small"
                    colorType={isEdit ? "primary" : "grey"}
                    width="w-[100px]"
                    disabled={watch("content-edit")?.length > 1000}
                  />
                  <SpartaButton
                    onClick={onClickCommentEditCancel}
                    content={isEdit ? "수정취소" : "삭제"}
                    size="small"
                    colorType="grey"
                    width="w-[100px]"
                  />
                </div>
              </div>
              <textarea
                maxLength={1000}
                placeholder="댓글을 입력해주세요"
                {...register("content-edit")}
                className="p-x py-4 w-full h-32 text-lg leading-tight text-white bg-transparent outline-none resize-none placeholder-gray-100"
                style={{ minHeight: "8rem", overflowY: "hidden" }}
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
              />
            </div>
            <p
              className={`w-full mt-3 mb-4 ${
                watch("content-edit")?.length > 1000 ? "text-error-default" : "text-gray-100"
              } text-right`}
            >
              {watch("content-edit")?.length}/1000
            </p>
          </form>
        ) : (
          <div className="flex flex-col gap-6 mt-10 ">
            <hr className="w-full border-t border-gray-300" />
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
                  <p className="font-bold text-white text-lg">작성자</p>
                  <span className="text-gray-400 text-xl">|</span>
                  <span className=" text-white text-lg">1시간 전</span>
                </div>
                <div className="flex gap-2">
                  <SpartaButton
                    onClick={onClickCommentEdit}
                    content="수정"
                    size="small"
                    colorType="grey"
                    width="w-[100px]"
                  />
                  <SpartaButton content="삭제" size="small" colorType="grey" width="w-[100px]" />
                </div>
              </div>
              <span className="text-white leading-6 ">
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
                안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6 mt-10 ">
          <hr className="w-full border-t border-gray-300" />
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={defaultProfile} className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full" />
                <p className="font-bold text-white text-lg">작성자</p>
                <span className="text-gray-400 text-xl">|</span>
                <span className=" text-white text-lg">12시간 전</span>
              </div>
            </div>
            <span className="text-white leading-6 ">
              안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
              안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요
            </span>
          </div>
        </div>
      </div>
      <SpartaPagination dataTotalCount={5} countPerPage={1} onChangePage={() => {}} />
    </div>
  );
}
