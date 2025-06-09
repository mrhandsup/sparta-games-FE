import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import { LuDownload } from "react-icons/lu";
import { downloadZip } from "../../api/direct";
import { formatToKST } from "../../util/formatToKST";
import AdminGameApproveModal from "./AdminGameApproveModal";
import AdminGameRejectModal from "./AdminGameRejectModal";

type Props = {
  idx: number;
  item: {
    category_data: {
      id: number;
      name: string;
    }[];
    game_register_logs: {
      content: string;
      created_at: string;
    }[];
    id: number;
    register_state: number;
    title: string;
    maker_data: {
      id: number;
      nickname: string;
    };
  };
  onClickShowMore?: (pk: number) => void;
  isDetail?: boolean;
};

const AdminListItem = ({ idx, item, onClickShowMore, isDetail }: Props) => {
  const switchCaseByState = () => {
    switch (item.register_state) {
      case 0:
        return {
          text: "검수",
          color: "bg-alert-default",
        };
      case 1:
        return {
          text: "승인",
          color: "bg-primary-400",
        };
      case 2:
        return {
          text: "반려",
          color: "bg-error-default",
        };
      default:
        return {
          text: "미정",
          color: "bg-alert-default",
        };
    }
  };

  return (
    <div className="flex flex-col  border-gray-300 border-solid rounded-lg p-4 border-[1px]">
      <div className="flex items-center justify-between w-full">
        <div className="text-white flex gap-3 items-center">
          <div className="flex items-center gap-3 flex-col">
            <p className="font-DungGeunMo text-[17px]">{idx + 1}</p>
            <p className="font-DungGeunMo text-[11px]">{item.category_data[0].name}</p>
          </div>
          {isDetail && (
            <div className={`rounded-md px-5 py-4 text-black ${switchCaseByState().color}`}>
              {switchCaseByState().text}
            </div>
          )}
          <div className="flex items-start gap-3 flex-col">
            <p className="text-title-22">{item.title}</p>
            <p>{item.maker_data.nickname}</p>
          </div>
        </div>
        <div className="flex gap-1">
          {item.register_state === 0 && (
            <>
              <AdminGameApproveModal game_id={item.id} />
              <AdminGameRejectModal game_id={item.id} />
            </>
          )}
          <SpartaButton
            content="미리보기"
            colorType="alert"
            size="medium"
            width="w-[100px]"
            onClick={() => window.open(`/game-detail?id=${item.id}`)}
          />
          {item.register_state === 0 && (
            <div
              className="bg-white rounded-md w-[47px] h-[47px] flex items-center  justify-center p-3 cursor-pointer"
              onClick={() => downloadZip(item.id)}
            >
              <LuDownload className="text-[30px]  text-black" />
            </div>
          )}
        </div>
      </div>
      {isDetail && (
        <div className="w-full flex items-center bg-gray-500 mt-2 rounded-lg p-2 font-DungGeunMo text-left justify-between">
          <div className="flex items-center gap-3">
            <p className="w-28">latest log</p>

            {item.game_register_logs.length === 0 ? (
              <p>no log</p>
            ) : (
              <p key={idx}>
                {formatToKST(item.game_register_logs[0].created_at)} {item.game_register_logs[0]?.content}
              </p>
            )}
          </div>
          {item.game_register_logs.length !== 0 && (
            <p className="w-16 cursor-pointer underline" onClick={() => onClickShowMore && onClickShowMore(item.id)}>
              더보기
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminListItem;
