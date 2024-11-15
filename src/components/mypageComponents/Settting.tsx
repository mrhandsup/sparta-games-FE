import log from "../../assets/Log.svg";
import { userStore } from "../../share/store/userStore";
import { User } from "../../types";
import Account from "./setting/Account";
import Profile from "./setting/Profile";

type TSettingProps = {
  user: User;
};

const Setting = (props: TSettingProps) => {
  return (
    <div className="flex flex-col gap-10">
      {/* 계정 정보 수정 */}
      <Account />
      {/* 프로필 수정 */}
      <Profile />
    </div>
  );
};

export default Setting;
