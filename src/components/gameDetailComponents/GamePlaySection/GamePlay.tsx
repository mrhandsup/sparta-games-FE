import { useRef, useState } from "react";

import expand from "../../../assets/gameDetail/expand.svg";
import share from "../../../assets/gameDetail/linkshare.svg";
import bookmark from "../../../assets/gameDetail/bookmark.svg";
import bookmarkfill from "../../../assets/gameDetail/bookmarkfill.svg";
import randomgame from "../../../assets/gameDetail/randomgame.svg";
import { useMutation } from "@tanstack/react-query";
import { postBookMark } from "../../../api/game";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../../hook/useModalToggles";
import { userStore } from "../../../share/store/userStore";
import { AxiosError } from "axios";

type Props = {
  gamePk?: number;
  title?: string;
  makerNmae?: string;
  gamePath?: string;
};

const GamePlay = ({ gamePk, title, makerNmae, gamePath }: Props) => {
  const BOOK_MARK_MODAL_ID = "bookMarkModal";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([BOOK_MARK_MODAL_ID, NO_ACTION_MODAL_ID]);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
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

  const { userData } = userStore();

  const gameUrl = `${import.meta.env.VITE_PROXY_HOST}${gamePath}/index.html`;

  const fullScreenRef = useRef<HTMLDivElement>(null);

  const onClickFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  const bookMarkMutation = useMutation({
    mutationFn: () => postBookMark(gamePk),
    onSuccess: () => {
      setIsBookmarked((prev) => !prev);
      onClickModalToggleHandlers[BOOK_MARK_MODAL_ID]();
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
    <div className="w-[880px]">
      <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
        <p>[{title}]</p>
        <div className="flex justify-between">
          <p className="text-gray-100 text-[28px]">[{makerNmae}]</p>
          <div className="flex gap-6">
            <img
              src={isBookmarked ? bookmarkfill : bookmark}
              alt="즐겨찾기"
              onClick={onClickBookMark}
              className="cursor-pointer"
            />
            <img src={share} alt="링크 공유" onClick={onClickLinkCopy} className="cursor-pointer" />
            <img src={randomgame} alt="랜덤 게임 추천" onClick={onClickRandomGamePick} className="cursor-pointer" />
            <img src={expand} onClick={onClickFullscreen} alt="전체화면" className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full h-[560px] bg-gray-400 rounded-xl" ref={fullScreenRef}>
        <iframe src={gameUrl} width="100%" height="100%" className="rounded-xl" />
      </div>

      {userData && noActionModalData ? (
        <SpartaReactionModal
          isOpen={modalToggles[BOOK_MARK_MODAL_ID]}
          onClose={onClickModalToggleHandlers[BOOK_MARK_MODAL_ID]}
          modalId={BOOK_MARK_MODAL_ID}
          title={isBookmarked ? "즐겨찾기 완료" : "즐겨찾기 취소"}
          content={
            isBookmarked
              ? "즐겨찾기가 성공적으로 완료되었어요.<br/>즐겨찾기한 게임은 마이페이지에서 확인 가능합니다."
              : "즐겨찾기가 취소되었습니다."
          }
          type={isBookmarked ? "primary" : "error"}
          btn1={{
            text: "확인했습니다",
            onClick: () => {
              onClickModalToggleHandlers[BOOK_MARK_MODAL_ID]();
            },
          }}
        />
      ) : (
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
  );
};

export default GamePlay;
