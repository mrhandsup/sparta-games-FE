import React from "react";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import { LuDownload } from "react-icons/lu";
import { TGameData } from "../../types";
import { downloadZip } from "../../api/direct";

type Props = {
  idx: number;
  item: {
    category_name: string[];
    game_register_logs: {
      content: string;
    }[];
    pk: number;
    register_state: number;
    title: string;
    maker_name: string;
  };
};

const AdminListItem = ({ idx, item }: Props) => {
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
            <p className="font-DungGeunMo text-[17px]">[{idx + 1}]</p>
            <p className="font-DungGeunMo text-[11px]">[{item.category_name[0]}]</p>
          </div>
          <div className={`rounded-md px-5 py-4 text-black ${switchCaseByState().color}`}>
            {switchCaseByState().text}
          </div>
          <div className="flex items-start gap-3 flex-col">
            <p className="text-title-22">[{item.title}]</p>
            <p>[{item.maker_name}]</p>
          </div>
        </div>
        <div className="flex gap-1">
          {item.register_state === 0 && (
            <>
              <SpartaButton content="승인" colorType="primary" size="medium" width="w-[80px]" />
              <SpartaButton content="반려" colorType="error" size="medium" width="w-[80px]" />
            </>
          )}
          <SpartaButton
            content="미리보기"
            colorType="alert"
            size="medium"
            width="w-[100px]"
            onClick={() => window.open(`/game-detail?id=${item.pk}`)}
          />
          <div
            className="bg-white rounded-md w-[47px] h-[47px] flex items-center  justify-center p-3 cursor-pointer"
            onClick={() => downloadZip(item.pk)}
          >
            <LuDownload className="text-[30px]  text-black" />
          </div>
        </div>
      </div>
      <div className="w-full flex bg-gray-500 mt-2 rounded-lg p-2 font-DungGeunMo text-left justify-between">
        <div className="flex items-center gap-3">
          <p>log</p>
          <p key={idx}>{item.game_register_logs[0]?.content}</p>
          {item.game_register_logs.length === 0 && <p>로그 없음</p>}
        </div>
        {item.game_register_logs.length !== 0 && <p>더보기</p>}
      </div>
    </div>
  );
};

export default AdminListItem;
