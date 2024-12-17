import GamePlay from "./GamePlay";
import GameMedia from "./GameMedia";

import "./GamePlaySwiper.css";
import { TGamePlayData } from "../../../types";
import GameDescription from "./GameDescription";

type Props = {
  gamePlayData?: TGamePlayData;
  more: boolean;
  onClickMoreToggleHandler: () => void;
};

const GamePlaySection = ({ gamePlayData, more, onClickMoreToggleHandler }: Props) => {
  const { title, maker_name, gamepath, youtube_url, screenshot, content } = gamePlayData || {};

  return (
    <section className="mt-6">
      <div className="flex gap-5">
        <GamePlay title={title} makerNmae={maker_name} gamePath={gamepath} />
        <GameMedia youtubeUrl={youtube_url} screenShot={screenshot} />
      </div>
      <GameDescription more={more} moreToggle={onClickMoreToggleHandler} content={content} />
    </section>
  );
};

export default GamePlaySection;
