import log from "../../assets/Log.svg";
import { User } from "../../types";

type TSettingProps = {
  user: User;
};

const Setting = (props: TSettingProps) => {
  return (
    <div className="flex flex-col gap-10">
      {/* 계정 정보 수정 */}
      <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start ">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <img src={log} />
            <p className="font-DungGeunMo text-heading-32 text-white">계정정보 수정</p>
          </div>
          <button className="border-gray-400 border-2 w-[20%] h-10 rounded-md text-gray-400 font-bold">수정하기</button>
        </div>
      </div>
      {/* 프로필 수정 */}
      <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start ">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <img src={log} />
            <p className="font-DungGeunMo text-heading-32 text-white">프로필 수정</p>
          </div>
          <button className="border-gray-400 border-2 w-[20%] h-10 rounded-md text-gray-400 font-bold">수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
