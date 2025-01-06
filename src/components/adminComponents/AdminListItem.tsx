import React from "react";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import { LuDownload } from "react-icons/lu";

type Props = {};

const AdminListItem = (props: Props) => {
  return (
    <div className="flex justify-between items-center  border-gray-300 border-solid rounded-lg p-4 border-[1px]">
      <div className="text-white flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="font-DungGeunMo text-[17px]">[Num]</p>
          <p className="text-title-22">[title]</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-DungGeunMo text-[11px]">[Category]</p>
          <p>[title]</p>
        </div>
      </div>
      <div className="flex gap-1">
        <SpartaButton content="승인" colorType="primary" size="medium" width="w-[80px]" />
        <SpartaButton content="반려" colorType="error" size="medium" width="w-[80px]" />
        <SpartaButton content="미리보기" colorType="alert" size="medium" width="w-[100px]" />
        <div className="bg-white rounded-md w-[47px] h-[47px] flex items-center  justify-center p-3 cursor-pointer">
          <LuDownload className="text-[30px]  text-black" />
        </div>
      </div>
    </div>
  );
};

export default AdminListItem;
