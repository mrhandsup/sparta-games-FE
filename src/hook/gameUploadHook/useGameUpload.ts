import { ChangeEvent, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import type { TGameUploadInput } from "../../types";
import changeUrl from "../../util/changeUrl";

const useGameUpload = () => {
  const { register, watch, setValue, formState, handleSubmit } = useForm<TGameUploadInput>();

  const [note, setNote] = useState({ 1: false, 2: false, 3: false });
  const [previewThumbnail, setPreviewThumbnail] = useState<string[]>([]);
  const [previewStillCut, setPreviewStillCut] = useState<string[]>([]);

  //이미지 미리보기용 onChangeHandler
  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    const file = [...e.target.files!];
    const urlArr: string[] = [];

    file.map((item) => {
      const url = changeUrl(item);
      urlArr.push(url);
    });

    if (inputId === "game-thumbnail") {
      setPreviewThumbnail(urlArr);
    }

    if (inputId === "still-cut") {
      setPreviewStillCut([...previewStillCut, ...urlArr]);
    }
  };

  const onClickImageDeleteHandler = (type: "thumbnail" | "stillCut", arg: number) => {
    if (type === "thumbnail") {
      setPreviewThumbnail([]);
      setValue("thumbnail", []);
    }

    if (type === "stillCut") {
      const previewArr = [...previewStillCut];
      const fileArr = [...watch("stillCut")];

      previewArr.splice(arg, 1);
      fileArr.splice(arg, 1);

      setPreviewStillCut([...previewArr]);
      setValue("stillCut", [...fileArr]);
    }
  };

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

  const onSubmitHandler: SubmitHandler<TGameUploadInput> = (data) => {
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
    onChangeImageHandler,
    onClickImageDeleteHandler,
    onClickNoteToggleHandler,
    onSubmitHandler,
  };

  return { note, form, previewThumbnail, previewStillCut, eventHandler };
};

export default useGameUpload;
