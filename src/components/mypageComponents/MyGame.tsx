import { useQuery } from "@tanstack/react-query";
import { getUserGameMadeList } from "../../api/user";
import { TListResponse, TUser } from "../../types";
import MyGameCard from "./MyGameCard";
import log from "../../assets/Log.svg";

type TMyGameProps = {
  user: TUser;
};

const MyGame = (props: TMyGameProps) => {
  //* Hooks
  const myGameData = useQuery<TListResponse>({
    queryKey: ["myGameList", props.user.user_pk],
    queryFn: () => getUserGameMadeList(props.user.user_pk),
  });

  const gameData = myGameData.data && myGameData.data.results;

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start">
      <div className="flex items-center gap-4 justify-start mb-3">
        <img src={log} />
        <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 개발중인 게임</p>
      </div>
      {/* 만든 게임 */}
      {gameData && gameData.length > 0 ? (
        gameData.map((game: any) => <MyGameCard item={game} />)
      ) : (
        <p className="text-white w-full text-center py-20 text-heading-20">개발중인 게임이 없습니다.</p>
      )}
    </div>
  );
};

export default MyGame;
