import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyBookmarkList, postBookMark } from "../../../api/game";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../../hook/useModalToggles";
import { userStore } from "../../../share/store/userStore";

import { TGameData, TGameDataResponse } from "../../../types";

import randomgame from "../../../assets/gameDetail/randomgame.svg";
import expand from "../../../assets/gameDetail/expand.svg";
import share from "../../../assets/gameDetail/linkshare.svg";
import bookmark from "../../../assets/gameDetail/bookmark.svg";
import bookmarkfill from "../../../assets/gameDetail/bookmarkfill.svg";
import Preview from "../../../assets/gameDetail/Priview.jpg";

type Props = {
  gameId?: number;
  title?: string;
  makerName?: string;
  makerId?: number;
  isLiked?: boolean;
  gamePath?: string;
};

const GamePlay = ({ gameId, title, makerName, makerId, gamePath }: Props) => {
  const BOOK_MARK_MODAL_ID = "bookMarkModal";
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([BOOK_MARK_MODAL_ID, NO_ACTION_MODAL_ID]);
  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    completeBookMark: {
      title: "즐겨찾기 완료",
      content: "즐겨찾기가 성공적으로 완료되었어요.<br/>즐겨찾기한 게임은 마이페이지에서 확인 가능합니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
    cancelBookMark: {
      title: "즐겨찾기 취소",
      content: "즐겨찾기가 취소되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
    linkcopy: {
      title: "링크복사 완료",
      content: "게임링크가 성공적으로 복사되었어요.<br/>원하시는 곳에서 붙여넣기 하여 게임을 공유해보세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
    randomgamepick: {
      title: "개발예정 기능",
      content: "게임 랜덤 추천 기능은 개발 예정입니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
    bookmarkerror: {
      title: "즐겨찾기 실패",
      content: "로그인 후에 이용해주세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(noActionData.linkcopy);

  const gameUrl =
    import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
      ? `${import.meta.env.VITE_PROXY_HOST}${gamePath}/index.html`
      : gamePath + "/index.html";

  const fullScreenRef = useRef<HTMLDivElement>(null);

  const onClickFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { userData } = userStore();

  const { data, isLoading } = useQuery<TGameDataResponse>({
    queryKey: ["isBookMarked"],
    queryFn: () => getMyBookmarkList(userData?.data.user_id),
    enabled: !!userData,
  });

  const bookMarkedGames = data?.data ?? [];
  const currentBookMarkedGame = bookMarkedGames?.some((game: TGameData) => game.id === gameId);

  const bookMarkMutation = useMutation({
    mutationFn: () => postBookMark(gameId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isBookMarked"] });

      setNoActionModalData(!currentBookMarkedGame ? noActionData.completeBookMark : noActionData.cancelBookMark);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },

    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        setNoActionModalData(noActionData.bookmarkerror);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      } else {
        window.alert("알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.");
      }
    },
  });

  const onClickBookMark = () => {
    bookMarkMutation.mutate();
  };

  const onClickLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);

    setNoActionModalData(noActionData.linkcopy);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  const onClickRandomGamePick = () => {
    setNoActionModalData(noActionData.randomgamepick);
    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[500px] flex justify-center items-center"></div>
      ) : (
        <div className="w-[75%]">
          <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
            <p>{title}</p>
            <div className="flex justify-between">
              <p
                className="text-gray-100 text-[28px] cursor-pointer"
                onClick={() => navigate(`/user-profile/${makerId}`)}
              >
                {makerName}
              </p>
              {gamePath && (
                <div className="flex gap-6">
                  <img
                    src={currentBookMarkedGame ? bookmarkfill : bookmark}
                    alt="즐겨찾기"
                    onClick={onClickBookMark}
                    className="cursor-pointer"
                  />
                  <img src={share} alt="링크 공유" onClick={onClickLinkCopy} className="cursor-pointer" />
                  <img
                    src={randomgame}
                    alt="랜덤 게임 추천"
                    onClick={onClickRandomGamePick}
                    className="cursor-pointer"
                  />
                  <img src={expand} onClick={onClickFullscreen} alt="전체화면" className="cursor-pointer" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 w-full h-[625px] bg-gray-400 rounded-xl" ref={fullScreenRef}>
            {gamePath ? (
              <iframe src={gameUrl} width="100%" height="100%" className="rounded-xl" />
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-xl relative">
                <img src={Preview} className="w-full h-full brightness-50 object-cover" />
                <div className="absolute inset-0 flex justify-center items-center">
                  <p className="text-white text-2xl font-DungGeunMo text-center">
                    미리보기 페이지에서는 게임을 플레이 할 수 없습니다.
                    <br />
                    플레이 영상, 스틸컷, 게임설명 등의 정보를 확인해주세요.
                  </p>
                </div>
              </div>
            )}
          </div>

          {noActionModalData && (
            <SpartaReactionModal
              isOpen={modalToggles[NO_ACTION_MODAL_ID]}
              onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
              modalId={NO_ACTION_MODAL_ID}
              title={noActionModalData.title || ""}
              content={noActionModalData.content || ""}
              btn1={{
                text: noActionModalData?.btn1?.text || "",
                onClick: noActionModalData?.btn1?.onClick || (() => {}),
              }}
              type={noActionModalData.type}
            />
          )}
        </div>
      )}
    </>
  );
};

export default GamePlay;
