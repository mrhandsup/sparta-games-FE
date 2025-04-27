import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGameDetail } from "../api/game";
import { getRegisterGameRejectLog } from "../api/direct";
import GamePlaySection from "../components/gameDetailComponents/GamePlaySection/GamePlaySection";
import ReviewContents from "../components/gameDetailComponents/ReviewSection/ReviewContents";
import { userStore } from "../share/store/userStore";
import useModalToggles from "../hook/useModalToggles";
import { TGamePlayDataResponse } from "../types";
import SpartaButton from "../spartaDesignSystem/SpartaButton";
import CaretLeft from "../assets/CaretLeft";
import SpartaReactionModal from "../spartaDesignSystem/SpartaReactionModal";
import SpartaModal from "../spartaDesignSystem/SpartaModal";
import EditCheck from "../components/gameUploadComponents/EditCheck";
import DeleteCheck from "../components/gameUploadComponents/DeleteCehck";
import loading from "../assets/common/loading.gif";

const GameDetail = () => {
  const GAME_EDIT_CHECK_ID = "gameEditCheckId";
  const GAME_DELETE_CHECK_ID = "gameDeleteCheckId";
  const NO_ACTION_MODAL_ID = "noActionModalId";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    GAME_EDIT_CHECK_ID,
    GAME_DELETE_CHECK_ID,
    NO_ACTION_MODAL_ID,
  ]);

  const [searchParams] = useSearchParams();
  const gameDetailId = Number(searchParams.get("id"));

  const { userData } = userStore();

  const { data: gamePlayData, isLoading } = useQuery<TGamePlayDataResponse>({
    queryKey: ["gameList"],
    queryFn: () => getGameDetail(gameDetailId),
  });

  const rejectLogs = useQuery({
    queryKey: ["gameLog", gameDetailId],
    queryFn: () => getRegisterGameRejectLog(gameDetailId),
    enabled:
      !!gameDetailId &&
      !!userData &&
      !!gamePlayData &&
      userData.user_pk === gamePlayData.data.maker_data.id &&
      gamePlayData.data.register_state === 2,
  });

  const gameCategory = gamePlayData?.data.category[0]?.name;

  useEffect(() => {
    if (rejectLogs.data) {
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  }, [rejectLogs.data]);

  const queryClient = useQueryClient();

  useEffect(() => {
    // 클린업으로 쿼리 캐시 초기화
    return () => {
      queryClient.removeQueries({ queryKey: ["gameList"] });
      queryClient.removeQueries({ queryKey: ["gameLog"] });
    };
  }, [gameDetailId]);

  return (
    <>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={loading} className="w-[300px] h-[300px]" alt="로딩 중" />
        </div>
      ) : (
        <main className="mx-[130px]">
          <div className="flex justify-between mt-10 items-center font-DungGeunMo text-[24px] text-gray-300">
            <Link to={`/category?category=${gameCategory}`} className="flex gap-3">
              <CaretLeft />
              <p>{gameCategory}</p>
            </Link>

            {userData?.user_pk === gamePlayData?.data.maker_data.id && (
              <>
                <div className="flex gap-2">
                  <span>
                    <SpartaButton
                      content={"수정하기"}
                      colorType={"alert"}
                      width={"w-[134px]"}
                      size={"medium"}
                      onClick={() => onClickModalToggleHandlers[GAME_EDIT_CHECK_ID]()}
                    />
                  </span>
                  <SpartaButton
                    content={"삭제하기"}
                    colorType={"error"}
                    width={"w-[134px]"}
                    size={"medium"}
                    onClick={() => onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]()}
                  />
                </div>
              </>
            )}
          </div>
          <GamePlaySection gamePlayData={gamePlayData?.data} />
          {gamePlayData?.data.register_state === 1 ? (
            <ReviewContents gamePk={gameDetailId} />
          ) : (
            <p className="my-10 font-DungGeunMo text-3xl text-gray-100">*댓글기능은 검수 통과 후 활성화 됩니다.</p>
          )}
        </main>
      )}

      <SpartaModal
        isOpen={modalToggles[GAME_EDIT_CHECK_ID]}
        onClose={onClickModalToggleHandlers[GAME_EDIT_CHECK_ID]}
        modalId={GAME_EDIT_CHECK_ID}
        closeOnClickOutside={false}
      >
        <EditCheck
          gamePk={gameDetailId}
          gamePlayData={gamePlayData?.data}
          onClose={onClickModalToggleHandlers[GAME_EDIT_CHECK_ID]}
        />
      </SpartaModal>

      <SpartaModal
        isOpen={modalToggles[GAME_DELETE_CHECK_ID]}
        onClose={onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]}
        modalId={GAME_DELETE_CHECK_ID}
        closeOnClickOutside={false}
      >
        <DeleteCheck gamePk={gamePlayData?.data.id} onClose={onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]} />
      </SpartaModal>

      {rejectLogs.data && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
          title="게임이 반려되었습니다."
          content={rejectLogs.data?.content}
          btn1={{
            text: "확인",
            onClick: () => onClickModalToggleHandlers[NO_ACTION_MODAL_ID](),
          }}
          type={"error"}
        />
      )}
    </>
  );
};

export default GameDetail;
