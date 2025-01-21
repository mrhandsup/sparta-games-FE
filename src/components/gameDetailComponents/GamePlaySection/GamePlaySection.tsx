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
  const { id, title, maker_name, gamepath, youtube_url, screenshot, content } = gamePlayData || {};

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
    <section className="mt-6">
      <div className="flex gap-5">
        {/* TODO: account_user id와 games_game maker_id 동등 여부 통해 수정하기/ 삭제하기 버튼 표시*/}
        <GamePlay gamePk={id} title={title} makerName={maker_name} gamePath={gamepath} />
        <GameMedia youtubeUrl={youtube_url} screenShot={screenshot} />
      </div>
      <GameDescription title={title} content={content} screenshot={screenshot} />
    </section>
  );
};

export default GamePlaySection;
