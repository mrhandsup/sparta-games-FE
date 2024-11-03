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

export type ReviewInputForm = {
  comment: string;
  star: number;
  difficultyLevel: "easy" | "hard" | "";
};

export type User = {
  user_pk: number;
  nickname: string;
  email: string;
  profile_image: string;
  is_staff: boolean;
  is_maker: boolean;
  introduce: string;
  login_type: string;
  user_tech: string;
  game_category: any[];
};
