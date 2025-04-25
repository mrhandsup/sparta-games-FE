import GameCardList from "../homeComponents/GameCardList";
import { useQuery } from "@tanstack/react-query";
import log from "../../assets/Log.svg";
import { TListResponse, TUser } from "../../types";
import { getUserLikedGameList, getUserRecentGameList } from "../../api/user";
import useModalToggles from "../../hook/useModalToggles";
import MypageLogModal from "./MypageLogModal";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import { useState } from "react";

type TLogsProps = {
  user: TUser;
};

const Logs = (props: TLogsProps) => {
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles(["gameLogModal"]);

  //* Hooks
  const myRecentGameData = useQuery<TListResponse>({
    queryKey: ["myRecentGameList", props.user.user_pk],
    queryFn: () => getUserRecentGameList(props.user.user_pk),
  });

  const myLikedData = useQuery<TListResponse>({
    queryKey: ["myLikesList", props.user.user_pk],
    queryFn: () => getUserLikedGameList(props.user.user_pk),
  });

  const recentGameData = myRecentGameData.data && myRecentGameData.data?.results;

  const likedData = myLikedData.data && myLikedData.data?.results;

  //* Styles
  const LogsClassName = "bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start w-full";

  const [isRecent, setIsRecent] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-10">
      {/* 즐겨찾는 게임 */}
      {
        <GameCardList
          data={likedData}
          maxNum={3}
          containerClassName={LogsClassName}
          noNavigation={(likedData?.length ?? 0) < 4}
          navigateFn={() => {
            setIsRecent(false);
            onClickModalToggleHandlers["gameLogModal"]();
          }}
        >
          <div className="flex items-center gap-4 justify-start ">
            <img src={log} />
            <p className="font-DungGeunMo text-heading-32 text-white font-[400]">{props.user.nickname}의 Bookmark</p>
          </div>
        </GameCardList>
      }
      {/* 최근 게임 */}
      {
        <GameCardList
          data={recentGameData || []}
          maxNum={3}
          containerClassName={LogsClassName}
          noNavigation={(recentGameData?.length ?? 0) < 4}
          navigateFn={() => {
            setIsRecent(true);
            onClickModalToggleHandlers["gameLogModal"]();
          }}
        >
          <div className="flex items-center gap-4 justify-start ">
            <img src={log} />
            <p className="font-DungGeunMo text-heading-32 text-white font-[400]">{props.user.nickname}의 Playlist</p>
          </div>
        </GameCardList>
      }
      {/* 커뮤니티 활동 */}
      {/* <GameCardList data={data} maxNum={3} containerClassName={LogsClassName} noNavigation={(data?.length ?? 0) < 4}>
        <div className="flex items-center gap-4 justify-start ">
          <img src={log} />
          <p className="font-DungGeunMo text-heading-32 text-white">[{props.user.nickname}]의 최근 커뮤니티 활동</p>
        </div>
      </GameCardList> */}
      <SpartaModal
        modalId={"gameLogModal"}
        isOpen={modalToggles["gameLogModal"]}
        onClose={onClickModalToggleHandlers["gameLogModal"]}
        closeOnClickOutside
        type="primary"
      >
        <MypageLogModal user_name={props.user.nickname} user_pk={props.user.user_pk} recent={isRecent} />
      </SpartaModal>
    </div>
  );
};

export default Logs;
