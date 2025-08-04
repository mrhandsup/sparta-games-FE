import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteGameList, getGameDetail } from "../api/game";
import { getRegisterGameRejectLog } from "../api/direct";

import GamePlaySection from "../components/gameDetailComponents/GamePlaySection/GamePlaySection";
import ReviewContents from "../components/gameDetailComponents/ReviewSection/ReviewContents";

import { userStore } from "../share/store/userStore";

import useModalToggles from "../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";

import { TGamePlayDataResponse } from "../types";

import SpartaButton from "../spartaDesignSystem/SpartaButton";

import loading from "../assets/common/loading.gif";
import CaretLeft from "../assets/CaretLeft";
import SpartaPhraseCheckModal from "../spartaDesignSystem/SpartaPhraseCheckModal";
import { AxiosError } from "axios";

const GameDetail = () => {
  const GAME_EDIT_CHECK_ID = "gameEditCheckId";
  const GAME_DELETE_CHECK_ID = "gameDeleteCheckId";
  const GAME_DELETE_SUCCESS_ID = "gameDelteSuccessModal";
  const NO_ACTION_MODAL_ID = "noActionModalId";

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    GAME_EDIT_CHECK_ID,
    GAME_DELETE_CHECK_ID,
    GAME_DELETE_SUCCESS_ID,
    NO_ACTION_MODAL_ID,
  ]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameDetailId = Number(searchParams.get("id"));

  const { userData } = userStore();

  const {
    data: gamePlayData,
    isLoading,
    isError,
    error,
  } = useQuery<TGamePlayDataResponse, AxiosError>({
    queryKey: ["gameList"],
    queryFn: () => getGameDetail(gameDetailId),
    retry: false,
  });

  const rejectLogs = useQuery({
    queryKey: ["gameLog", gameDetailId],
    queryFn: () => getRegisterGameRejectLog(gameDetailId),
    enabled:
      !!gameDetailId &&
      !!userData &&
      !!gamePlayData &&
      userData.data.user_id === gamePlayData.data.maker_data.id &&
      gamePlayData.data.register_state === 2,
  });

  const gameCategory = gamePlayData?.data.category[0]?.name;

  useEffect(() => {
    if (isError && error?.response?.status === 404) {
      navigate(`/my-page/${userData?.data.user_id}?tab=develop`);
    }
  }, [isError, error, navigate, userData]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    gameDeleteSuccess: {
      title: "게임삭제 완료",
      content: "게임을 성공적으로 삭제했습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          navigate(`/my-page/${userData?.data.user_id}`);
        },
      },
      type: "error",
      closeOnClickOutside: false,
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.gameDeleteSuccess,
  );

  useEffect(() => {
    if (rejectLogs.data) {
      setNoActionModalData({
        title: "게임이 반려되었습니다.",
        content: rejectLogs?.data?.data.content,
        btn1: {
          text: "확인했습니다.",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          },
        },
        type: "error",
      });

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

  const onClickRemoveGame = async (gamePk: number | undefined) => {
    const res = await deleteGameList(gamePk);

    if (res?.status === 200) {
      setNoActionModalData(noActionData.gameDeleteSuccess);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      queryClient.invalidateQueries({ queryKey: ["myGameList"] });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={loading} className="w-[300px] h-[300px]" alt="로딩 중" />
        </div>
      ) : (
        <main>
          <div className="flex justify-between mt-10 items-center font-DungGeunMo text-[24px] text-gray-300">
            <Link to={`/category?category=${gameCategory}`} className="flex gap-3">
              <CaretLeft />
              <p>{gameCategory}</p>
            </Link>

            {userData?.data.user_id === gamePlayData?.data.maker_data.id && (
              <>
                <div className="flex gap-2">
                  <span>
                    <SpartaButton
                      content={"수정하기"}
                      colorType={"alert"}
                      customStyle="w-[170px]"
                      size={"medium"}
                      onClick={() => onClickModalToggleHandlers[GAME_EDIT_CHECK_ID]()}
                    />
                  </span>
                  <SpartaButton
                    content={"삭제하기"}
                    colorType={"error"}
                    customStyle="w-[170px]"
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

      <SpartaPhraseCheckModal
        isOpen={modalToggles[GAME_EDIT_CHECK_ID]}
        modalId={GAME_EDIT_CHECK_ID}
        onClose={onClickModalToggleHandlers[GAME_EDIT_CHECK_ID]}
        onClickEvent={() => {
          navigate(`/game-edit/${gameDetailId}`, { state: { gameData: gamePlayData?.data, isEditMode: true } });
        }}
        modalPurpose="edit"
      >
        <ul className="list-disc pl-5 leading-6 text-white">
          <li>
            게임파일을 재업로드 할 시 <span className="text-alert-default">재검수</span>가 진행되어 시간이 소요됩니다.
          </li>
          <li className="ms-4">이외 기본적인 제목, 게임설명 수정 시 검수과정 없이 바로 업데이트가 진행됩니다.</li>
          <li className=" ms-4">
            일부 PC환경에서 썸네일과 스틸컷 파일이 불러와지지 않는 오류가 있으며, 현재 해결중에 있습니다.
          </li>
          <li>
            수정을 하시기 위해서는 <b className="text-alert-default">‘게임을 수정하겠습니다'</b>를 입력해주세요!
          </li>
        </ul>
      </SpartaPhraseCheckModal>

      <SpartaPhraseCheckModal
        isOpen={modalToggles[GAME_DELETE_CHECK_ID]}
        modalId={GAME_DELETE_CHECK_ID}
        onClose={onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]}
        onClickEvent={() => {
          onClickRemoveGame(gameDetailId);
        }}
        modalPurpose="delete"
      >
        <ul className="list-disc pl-5 leading-6 text-white">
          <li>게임삭제를 진행하면 즉시 삭제됩니다.</li>
          <li>댓글 및 데이터들이 전부 삭제되므로, 댓글 등의 반응은 미리 백업을 진행해주세요!</li>

          <li>
            삭제를 하시기 위해서는 <b className="text-error-default "> ‘게임을 삭제하겠습니다’</b> 를 입력해주세요!
          </li>
        </ul>
      </SpartaPhraseCheckModal>

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
          btn2={
            noActionModalData?.btn2 && {
              text: noActionModalData?.btn2?.text || "",
              onClick: noActionModalData?.btn2?.onClick || (() => {}),
            }
          }
          type={"error"}
        />
      )}
    </>
  );
};

export default GameDetail;
