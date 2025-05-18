import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectRegisterGame } from "../../api/direct";
import useModalToggles from "../../hook/useModalToggles";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import { useEffect, useState } from "react";

type Props = {
  game_id: number;
};

const AdminGameRejectModal = ({ game_id }: Props) => {
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles(["rejectModal"]);

  const queryClient = useQueryClient();

  const rejectRegisterGameMutation = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => rejectRegisterGame(id, content),
    onSuccess: () => {
      setComplete(true);
      queryClient.invalidateQueries({ queryKey: ["adminGameList"] });
    },
  });

  const [complete, setComplete] = useState(false);
  const [rejectContent, setRejectContent] = useState("");

  useEffect(() => {
    return () => {
      setComplete(false);
      setRejectContent("");
    };
  }, [modalToggles, game_id]);

  return (
    <div>
      <SpartaButton
        content="반려"
        colorType="error"
        size="medium"
        width="w-[80px]"
        onClick={() => onClickModalToggleHandlers["rejectModal"]()}
      />
      <SpartaModal
        isOpen={modalToggles["rejectModal"]}
        onClose={onClickModalToggleHandlers["rejectModal"]}
        modalId={"rejectModal"}
        type="error"
      >
        {complete ? (
          <div className="w-[300px] flex flex-col gap-2">
            <p className=" font-DungGeunMo text-[20px] text-error-default">반려 완료</p>
            <p className="text-[16px] text-white py-8">게임이 반려되었습니다.</p>
            <SpartaButton
              content="확인"
              colorType="error"
              size="medium"
              width="w-full"
              onClick={() => {
                onClickModalToggleHandlers["rejectModal"]();
              }}
              type="filled"
            />
          </div>
        ) : (
          <div className="w-[500px] flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <p className=" font-DungGeunMo text-[20px] text-error-default">반려 사유</p>
              <textarea
                className="w-full h-[200px] p-4 rounded-lg border-[1px] border-gray-300 border-solid bg-transparent"
                placeholder="반려 사유를 입력해주세요."
                value={rejectContent}
                onChange={(e) => setRejectContent(e.target.value)}
              />
            </div>
            <SpartaButton
              content="반려"
              colorType="error"
              disabled={rejectContent == ""}
              size="medium"
              width="w-full"
              onClick={() => {
                rejectRegisterGameMutation.mutate({ id: game_id, content: rejectContent });
              }}
              type="filled"
            />
            <SpartaButton
              content="취소"
              colorType="grey"
              size="medium"
              width="w-full"
              onClick={() => {
                onClickModalToggleHandlers["rejectModal"]();
              }}
            />
          </div>
        )}
      </SpartaModal>
    </div>
  );
};

export default AdminGameRejectModal;
