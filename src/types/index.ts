import type { FormState, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

//공용으로 쓰는 타입의 경우 이 파일의 작성 그렇지 않을경우 분리해서 작성
export type GameUploadInput = {
  title: string;
  category: string;
  content: string;
  gameFile: File[];
  thumbnail: File[];
  stillCut: File[];
  video: string;
};

export type GameUploadInputForm = {
  register: UseFormRegister<GameUploadInput>;
  watch: UseFormWatch<GameUploadInput>;
  setValue: UseFormSetValue<GameUploadInput>;
  formState: FormState<GameUploadInput>;
  handleSubmit: UseFormHandleSubmit<GameUploadInput>;
};
