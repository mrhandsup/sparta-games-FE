import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { getTeamBuildComments, postTeamBuildComments, putTeamBuildComments } from "../../../../api/teambuilding";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";
import SpartaTabNav from "../../../../spartaDesignSystem/SpartaTabNav";

import { TApiResponse, TTeamBuildCommentData, TTeamBuildPostDetail } from "../../../../types";
import { getTimeAgoInHours } from "../../../../util/getTimeAgoInHours";

import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import SpartaPagination from "../../../../spartaDesignSystem/SpartaPagination";
import loading from "../../../../assets/common/loading.gif";

type Props = {
  userId: number | undefined;
  postDetail: TTeamBuildPostDetail | undefined;
  onClickDeleteComment: (id: number) => void;
  openErrorModal: () => void;
};
type SortTab = "new" | "old";

const SORT_LABELS: Record<SortTab, string> = {
  new: "최신순",
  old: "오래된 순",
};

export default function RecruitCommentSection({ userId, postDetail, onClickDeleteComment, openErrorModal }: Props) {
  const COUNT_PER_PAGE = 7;

  const [page, setPage] = useState<number>(1);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [sortTab, setSortTab] = useState<SortTab>("new");

  const queryClient = useQueryClient();

  const postTeamBuildCommentsMutation = useMutation({
    mutationFn: ({ postId, content }: { postId?: number | undefined; content: string }) =>
      postTeamBuildComments(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamBuildComments"] });
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else if (error.response && error.response.status === 401) {
        openErrorModal();
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const putTeamBuildCommentsMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId?: number | null | undefined; content: string }) =>
      putTeamBuildComments(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamBuildComments"] });
      setEditingCommentId(null);
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        window.alert(`${(error.response?.data as { message?: string })?.message}`);
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const { data } = useQuery<TApiResponse<TTeamBuildCommentData[]>>({
    queryKey: ["teamBuildComments", postDetail?.id, page, sortTab],
    queryFn: () => getTeamBuildComments(postDetail?.id, page, sortTab),
    enabled: !!postDetail?.id,
  });

  const commentData = data?.data;

  const onClickCommentEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postTeamBuildCommentsMutation.mutate({
      postId: postDetail?.id,
      content: newComment,
    });
    setNewComment("");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContent.length > 1000) return;

    putTeamBuildCommentsMutation.mutate({
      commentId: editingCommentId,
      content: editingContent,
    });
  };
  const editTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isActuallyEdited = (create_dt: string, update_dt: string) => {
    const created = new Date(create_dt).getTime();
    const updated = new Date(update_dt).getTime();
    return updated - created > 1000; // 1초 이상 차이나면 수정된 것으로 간주
  };

  return (
    <>
      {postTeamBuildCommentsMutation.isPending && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={loading} className="w-24 h-24" alt="로딩 중" />
        </div>
      )}
      <div className="gap-3 mb-10 p-9 bg-gray-800 rounded-xl">
        <SpartaTabNav selectedTab={sortTab} onTabChange={setSortTab} tabLabels={SORT_LABELS} />

        <div className="flex items-center gap-3 mt-10 mb-4 font-DungGeunMo text-white">
          <p className="text-3xl">댓글</p>
          <span className="text-3xl">{commentData?.length}</span>
          {newComment.length > 1000 ? <p className=" text-error-default text-lg">*1000자 이내로 작성해주세요.</p> : ""}
        </div>

        <form onSubmit={handleCommentSubmit} className="w-full">
          <div
            className={`border border-solid ${
              newComment?.length > 1000
                ? "border-error-default"
                : newComment?.length > 0
                ? "border-primary-500"
                : "border-gray-400"
            } p-2 m-h-32 rounded-lg`}
          >
            <textarea
              maxLength={1000}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력해주세요"
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
              newComment.length > 1000 ? "text-error-default" : "text-gray-100"
            }  text-right`}
          >
            {newComment.length}/1000
          </p>

          <div className="mt-2 text-right">
            <SpartaButton
              content="댓글 등록하기"
              type="filled"
              size="small"
              customStyle="w-[180px]"
              disabled={
                newComment.length > 1000 || newComment.trim().length === 0 || putTeamBuildCommentsMutation.isPending
              }
            />
          </div>
        </form>

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-6 mt-10 ">
          {commentData?.map((comment) => (
            <>
              <hr className="w-full border-t border-gray-300" />
              <div className="flex flex-col gap-4 p-4" key={comment.id}>
                {editingCommentId === comment.id ? (
                  // 댓글 수정
                  <form onSubmit={handleEditSubmit} className="w-full mt-10">
                    <div
                      className={`border border-solid ${
                        editingContent.length > 1000 ? "border-error-default" : "border-gray-400"
                      } p-4 m-h-32 rounded-lg`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              comment?.author_data.image === ""
                                ? defaultProfile
                                : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                                ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + comment?.author_data.image
                                : comment?.author_data.image
                            }
                            className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full"
                          />
                          <p className="font-bold text-white text-lg">{comment.author_data.nickname}</p>
                          {editingContent.length > 1000 && (
                            <p className=" text-error-default text-sm">*1000자 이내로 작성해주세요.</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <SpartaButton
                            onClick={() => onClickCommentEdit(comment.id)}
                            content="수정완료"
                            size="small"
                            colorType="primary"
                            customStyle="w-[100px]"
                            disabled={
                              editingContent.length > 1000 ||
                              editingContent.trim().length === 0 ||
                              putTeamBuildCommentsMutation.isPending
                            }
                          />
                          <SpartaButton
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditingContent("");
                            }}
                            content="수정취소"
                            size="small"
                            colorType="grey"
                            customStyle="w-[100px]"
                          />
                        </div>
                      </div>
                      <textarea
                        ref={editTextareaRef}
                        maxLength={1000}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        placeholder="댓글을 입력해주세요"
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
                        editingContent.length > 1000 ? "text-error-default" : "text-gray-100"
                      } text-right`}
                    >
                      {editingContent.length}/1000
                    </p>
                  </form>
                ) : (
                  // 댓글 정보 보여지는 부분
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            comment?.author_data.image === ""
                              ? defaultProfile
                              : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                              ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + comment?.author_data.image
                              : comment?.author_data.image
                          }
                          className="w-8 h-8 border-2 border-solid border-gray-400 rounded-full"
                        />
                        <p className="font-bold text-white text-lg">{comment?.author_data.nickname}</p>
                        <span className="text-gray-400 text-xl">|</span>
                        <span className=" text-white text-lg">
                          {comment?.create_dt === comment?.update_dt
                            ? getTimeAgoInHours(comment?.create_dt)
                            : getTimeAgoInHours(comment?.update_dt)}
                        </span>
                        {isActuallyEdited(comment?.create_dt, comment?.update_dt) && (
                          <span className="text-gray-200">(수정됨)</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <SpartaButton
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditingContent(comment.content);
                            setTimeout(() => {
                              if (editTextareaRef.current) {
                                editTextareaRef.current.style.height = "auto";
                                editTextareaRef.current.style.height = editTextareaRef.current.scrollHeight + "px";
                              }
                            }, 0); // DOM 렌더 이후 실행
                          }}
                          content="수정"
                          size="small"
                          colorType="grey"
                          customStyle={`${
                            userId !== comment.author_data.id ? "hidden" : "block"
                          } w-[100px] hover:text-alert-default hover:border-alert-default`}
                        />
                        <SpartaButton
                          onClick={() => onClickDeleteComment(comment.id)}
                          content="삭제"
                          size="small"
                          colorType="grey"
                          customStyle={`${
                            userId !== comment.author_data.id ? "hidden" : "block"
                          } w-[100px] hover:text-error-default hover:border-error-default`}
                        />
                      </div>
                    </div>
                    <span className="text-white leading-6 ">{comment?.content}</span>
                  </>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      <SpartaPagination
        dataTotalCount={data?.pagination.count}
        countPerPage={COUNT_PER_PAGE}
        onChangePage={(e, page) => setPage(page)}
      />
    </>
  );
}
