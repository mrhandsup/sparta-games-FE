import { useEffect, useRef } from "react";

import GamePlay from "./GamePlay";
import GameMedia from "./GameMedia";
import GameDescription from "./GameDescription";

import { TGamePlayData } from "../../../types";

import { getPlayLog, postPlayLog } from "../../../api/game";

import usePlayTimeStore from "../../../share/store/playTimeStore";
import { userStore } from "../../../share/store/userStore";

type Props = {
  gamePlayData?: TGamePlayData;
};

const GamePlaySection = ({ gamePlayData }: Props) => {
  const { id, title, gamepath, youtube_url, screenshot, content, maker_data } = gamePlayData || {};

  const { userData } = userStore();
  const { playTimePk, setPlayTimePk } = usePlayTimeStore();

  const playTimePkRef = useRef(playTimePk);

  useEffect(() => {
    playTimePkRef.current = playTimePk;
  }, [playTimePk]);

  useEffect(() => {
    const fetchPlayLog = async () => {
      if (userData) {
        const res = await getPlayLog(id);
        setPlayTimePk(res?.playtime_pk || null);
      }
    };
    fetchPlayLog();

    return () => {
      if (playTimePkRef.current && userData) {
        const sendPlayLog = async () => {
          await postPlayLog(id, playTimePkRef.current);
        };
        sendPlayLog();
      }
    };
  }, [id]);

  return (
    <section className="mt-6">
      <div className="flex gap-5">
        <GamePlay
          gameId={id}
          title={title}
          makerName={maker_data?.nickname}
          gamePath={gamepath}
          makerId={maker_data?.id}
        />
        <GameMedia youtubeUrl={youtube_url} screenShot={screenshot} />
      </div>
      <GameDescription title={title} content={content} screenshot={screenshot} />
    </section>
  );
};

export default GamePlaySection;
