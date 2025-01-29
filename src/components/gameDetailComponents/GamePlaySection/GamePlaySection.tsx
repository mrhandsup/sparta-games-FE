import GamePlay from "./GamePlay";
import GameMedia from "./GameMedia";
import GameDescription from "./GameDescription";

import { TGamePlayData } from "../../../types";
import { useEffect, useRef } from "react";
import { getPlayLog, postPlayLog } from "../../../api/game";
import usePlayTimeStore from "../../../share/store/playTimeStore";

type Props = {
  gamePlayData?: TGamePlayData;
};

const GamePlaySection = ({ gamePlayData }: Props) => {
  const { id, title, maker_name, gamepath, youtube_url, screenshot, content, maker, thumbnail, register_state } =
    gamePlayData || {};
  const { playTimePk, setPlayTimePk } = usePlayTimeStore();
  const playTimePkRef = useRef(playTimePk);

  useEffect(() => {
    playTimePkRef.current = playTimePk;
  }, [playTimePk]);

  useEffect(() => {
    const fetchPlayLog = async () => {
      const res = await getPlayLog(id);
      setPlayTimePk(res?.playtime_pk || null);
    };
    fetchPlayLog();

    return () => {
      if (playTimePkRef.current) {
        const sendPlayLog = async () => {
          await postPlayLog(id, playTimePkRef.current);
        };
        sendPlayLog();
      }
    };
  }, [id]);

  return (
    <section className="mt-6 mb-12">
      <div className="flex gap-5">
        <GamePlay
          gamePk={id}
          title={title}
          makerName={maker_name}
          gamePath={gamepath}
          makerPk={maker}
          thumbnail={thumbnail}
        />
        <GameMedia youtubeUrl={youtube_url} screenShot={screenshot} />
      </div>
      <GameDescription title={title} content={content} screenshot={screenshot} />
    </section>
  );
};

export default GamePlaySection;
