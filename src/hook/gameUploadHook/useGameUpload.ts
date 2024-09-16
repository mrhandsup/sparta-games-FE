import { useState } from "react";

const useGameUpload = () => {
  const [note, setNote] = useState({ 1: false, 2: false, 3: false });

  const onClickNoteToggleHandler = (arg: 1 | 2 | 3) => {
    if (arg === 1) {
      setNote({ ...note, 1: !note[1] });
      return;
    }

    if (arg === 2) {
      setNote({ ...note, 2: !note[2] });
      return;
    }

    if (arg === 3) {
      setNote({ ...note, 3: !note[3] });
      return;
    }
  };

  const state = {
    note,
  };

  const eventHandler = {
    onClickNoteToggleHandler,
  };

  return { state, eventHandler };
};

export default useGameUpload;
