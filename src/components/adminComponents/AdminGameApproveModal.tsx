import React, { useEffect } from "react";
import SpartaReactionModal from "../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../hook/useModalToggles";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import { approveRegisterGame } from "../../api/direct";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  game_id: number;
};

const AdminGameApproveModal = ({ game_id }: Props) => {
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles(["approveModal"]);
  const queryClient = useQueryClient();

  const approveRegisterGameMutation = useMutation({
    mutationFn: approveRegisterGame,
    onSuccess: () => {
      setComplete(true);
      queryClient.invalidateQueries({ queryKey: ["adminGameList"] });
    },
  });

  const [complete, setComplete] = React.useState(false);

  useEffect(() => {
    return () => {
      setComplete(false);
    };
  }, [modalToggles, game_id]);

  return (
    <div>
      <SpartaButton
        content="승인"
        colorType="primary"
        size="medium"
        customStyle="w-[80px]"
        onClick={() => onClickModalToggleHandlers["approveModal"]()}
      />
      <SpartaReactionModal
        isOpen={modalToggles["approveModal"]}
        onClose={onClickModalToggleHandlers["approveModal"]}
        modalId={"approveModal"}
        title={complete ? "승인완료" : "게임승인"}
        content={
          complete
            ? "게임이 승인되어 유저들에게 노출을 시작합니다."
            : "승인 이후 유저들에게 바로 노출됩니다.<br/>미리보기 파일을 확인한 후 승인해주세요."
        }
        btn1={{
          text: complete ? "확인" : "승인",
          onClick: () => {
            complete ? onClickModalToggleHandlers["approveModal"]() : approveRegisterGameMutation.mutate(game_id);
          },
        }}
        btn2={
          !complete
            ? {
                text: "닫기",
                onClick: onClickModalToggleHandlers["approveModal"],
              }
            : undefined
        }
        type={"primary"}
      />
    </div>
  );
};

export default AdminGameApproveModal;
