import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import type { GameUploadInput } from "../../types";

const useGameUpload = () => {
  const { register, watch, setValue, formState, handleSubmit } = useForm<GameUploadInput>();
  const [note, setNote] = useState({ 1: false, 2: false, 3: false });

  useEffect(() => {}, []);

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

  const onSubmitHandler: SubmitHandler<GameUploadInput> = (data) => {
    //게입 업로드 api연결할 부분
    console.log(data);
  };

  const form = {
    register,
    watch,
    setValue,
    formState,
    handleSubmit,
  };

  const eventHandler = {
    onClickNoteToggleHandler,
    onSubmitHandler,
  };

  return { note, form, eventHandler };
};

export default useGameUpload;
