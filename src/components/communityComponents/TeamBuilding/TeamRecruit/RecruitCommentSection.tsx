import { useState } from "react";
import { useForm } from "react-hook-form";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";
import SpartaTabNav from "../../../../spartaDesignSystem/SpartaTabNav";

import defaultProfile from "../../../../assets/common/defaultProfile.svg";

type Props = {
  onClickDeleteComment: () => void;
};
type SortTab = "recent" | "oldest";

const SORT_LABELS: Record<SortTab, string> = {
  recent: "최신순",
  oldest: "오래된 순",
};

export default function RecruitCommentSection({ onClickDeleteComment }: Porps) {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data: unknown) => console.log(data);

  const [sortTab, setSortTab] = useState<SortTab>("recent");
  const [isEdit, setIsEdit] = useState(false);

  const onClickCommentEdit = () => {
    setIsEdit(true);
  };

  const onClickCommentEditCancel = () => {
    setIsEdit(false);
  };

  return (
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
          <SpartaButton content="댓글 등록하기" type="filled" size="small" customStyle="w-[180px]" />
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
                <span className="hidden  text-gray-400 text-xl">|</span>
                <span className="hidden text-white text-lg">1시간 전</span>
              </div>
              <div className="flex gap-2">
                <SpartaButton
                  onClick={onClickCommentEdit}
                  content="수정완료"
                  size="small"
                  colorType="primary"
                  customStyle="w-[100px]"
                  disabled={watch("content-edit")?.length > 1000}
                />
                <SpartaButton
                  onClick={onClickCommentEditCancel}
                  content="수정취소"
                  size="small"
                  colorType="grey"
                  customStyle="w-[100px]"
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
                  customStyle="w-[100px] hover:text-alert-default hover:border-alert-default"
                />
                <SpartaButton
                  content="삭제"
                  size="small"
                  colorType="grey"
                  customStyle="w-[100px] hover:text-error-default hover:border-error-default"
                  onClick={onClickDeleteComment}
                />
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
            안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요
            안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
            안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
            안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
            안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
            안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
            안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요
            안녕하세요안녕하세요 안녕하세요 안녕하세요
          </span>
        </div>
      </div>
    </div>
  );
}
