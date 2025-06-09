import { useQuery } from "@tanstack/react-query";
import pixelGame from "../../assets/homeImage/pixelGame.svg";
import AdminListItem from "../../components/adminComponents/AdminListItem";
import { getRegisterGameList, getRegisterGameStat } from "../../api/direct";
import { TGameAdminData } from "../../types";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const { data } = useQuery<{
    data: {
      state_ready: number;
      state_ok: number;
      state_deny: number;
    };
  }>({
    queryKey: ["registerGameStat"],
    queryFn: getRegisterGameStat,
  });

  const adminGameList = useQuery({
    queryKey: ["adminGameList"],
    queryFn: () => getRegisterGameList("state=0"),
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-24 py-20 gap-5">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-4">
          <img src={pixelGame} />
          <p className="font-DungGeunMo text-[24px] text-white">Game Issue</p>
        </div>
        <AiFillCaretRight className="w-8 h-8 text-white cursor-pointer" onClick={() => navigate("/admin/game-log")} />
      </div>
      <div className="flex gap-10 w-full">
        <div className="w-[25%] bg-gray-800 rounded-3xl p-10 text-white text-center h-fit">
          <div className="font-DungGeunMo text-[32px] text-white">검수 대기중</div>
          <div className="font-DungGeunMo text-[128px] text-white my-7">{data?.data.state_ready}</div>
          <div className="text-left text-body-18 mb-1">게임관리</div>
          <div className="flex justify-between text-body-18 mb-1">
            <p>승인된 게임</p>
            <p>{data?.data.state_ok}</p>
          </div>
          <div className="flex justify-between text-body-18">
            <p>반려된 게임</p>
            <p>{data?.data.state_deny}</p>
          </div>
        </div>
        <div className="w-[72%] bg-gray-800 rounded-3xl p-10 text-white text-center flex flex-col gap-3">
          {adminGameList.data?.data.map((item: TGameAdminData, idx: number) => (
            <AdminListItem key={idx} idx={idx} item={item} />
          ))}
          {adminGameList.data?.data.length === 0 && (
            <div className="font-DungGeunMo text-[24px] text-white m-auto">검수 대기중인 게임이 없습니다.</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <img src={pixelGame} />
        <p className="font-DungGeunMo text-[24px] text-white">Community Issue (V2 개발 예정)</p>
      </div>
    </div>
  );
};

export default AdminDashBoard;
