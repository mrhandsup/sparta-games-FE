import { useState } from "react";

const useGameDetail = () => {
  const [more, setMore] = useState(false);

  const onClickMoreToggleHandler = () => {
    setMore(!more);
  };

  return { more, onClickMoreToggleHandler };
};

export default useGameDetail;
