import { useRef, useState } from "react";

import expand from "../../../assets/gameDetail/expand.svg";
import share from "../../../assets/gameDetail/linkshare.svg";
import bookmark from "../../../assets/gameDetail/bookmark.svg";
import randomgame from "../../../assets/gameDetail/randomgame.svg";
import { useMutation } from "@tanstack/react-query";
import { postBookMark } from "../../../api/game";
import SpartaReactionModal from "../../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../../hook/useModalToggles";

type Props = {
  gamePk?: number;
  title?: string;
  makerNmae?: string;
  gamePath?: string;
};

const GamePlay = ({ gamePk, title, makerNmae, gamePath }: Props) => {
  const BOOK_MARK_MODAL_ID = "bookMarkModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([BOOK_MARK_MODAL_ID]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const gameUrl = `${import.meta.env.VITE_PROXY_HOST}${gamePath}/index.html`;
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    fullScreenRef.current?.requestFullscreen();
  };

  const bookMarkMutation = useMutation({
    mutationFn: (gamePk: number | undefined) => postBookMark(gamePk),
    onSuccess: () => {
      setIsBookmarked((prev) => !prev);
      onClickModalToggleHandlers[BOOK_MARK_MODAL_ID]();
    },
    onError: () => {
      window.alert("즐겨찾기에 실패했습니다. 잠시후에 다시 시도해주세요.");
    },
  });

  const handleBookMark = () => {
    bookMarkMutation.mutate(gamePk);
  };

  return (
    <div className="w-[880px]">
      <div className="flex flex-col gap-2 font-DungGeunMo text-[32px] text-white">
        <p>[{title}]</p>
        <div className="flex justify-between">
          <p className="text-gray-100 text-[28px]">[{makerNmae}]</p>
          <div className="flex gap-6">
            <img src={bookmark} alt="즐겨찾기" onClick={handleBookMark} className="cursor-pointer" />
            <img src={share} alt="링크 공유" className="cursor-pointer" />
            <img src={randomgame} alt="랜덤 게임 추천" className="cursor-pointer" />
            <img src={expand} onClick={handleFullscreen} alt="전체화면" className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full h-[560px] bg-gray-400 rounded-xl" ref={fullScreenRef}>
        <iframe src={gameUrl} width="100%" height="100%" className="rounded-xl" />
      </div>

      <SpartaReactionModal
        isOpen={modalToggles[BOOK_MARK_MODAL_ID]}
        onClose={onClickModalToggleHandlers[BOOK_MARK_MODAL_ID]}
        modalId={BOOK_MARK_MODAL_ID}
        title={isBookmarked ? "즐겨찾기 완료" : "즐겨찾기 취소"}
        content={
          isBookmarked
            ? "즐겨찾기가 성공적으로 완료되었어요. 즐겨찾기한 게임은 마이페이지에서 확인 가능합니다."
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
    </div>
  );
};

export default GamePlay;
