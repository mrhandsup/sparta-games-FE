import { useQuery } from "@tanstack/react-query";
import { getRegisterGameDetail } from "../../api/direct";
import { formatToKST } from "../../util/formatToKST";

type Props = {
  game_id: number;
};

function AdminLogsModal({ game_id }: Props) {
  const { data } = useQuery({
    queryKey: ["gameLog", game_id],
    queryFn: () => getRegisterGameDetail(game_id),
  });

  return (
    <div className="w-[600px] pt-2">
      <div className="w-full border-gray-100 rounded-lg border-[1px] border-solid items-center flex px-4 py-4 overflow-auto flex-col gap-2 max-h-[400px]">
        {data && data.data && data.data.length > 0 ? (
          data.data.map((item: any, idx: number) => (
            <div key={idx} className="text-white  flex items-center gap-3 w-full">
              <p>{formatToKST(item.created_at)}</p>
              <p>{item.content}</p>
            </div>
          ))
        ) : (
          <p className="text-white font-DungGeunMo text-heading-28 flex items-center justify-center w-full h-20">
            게임 로그가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminLogsModal;
