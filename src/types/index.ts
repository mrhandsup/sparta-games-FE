import type { FormState, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

//공용으로 쓰는 타입의 경우 이 파일의 작성 그렇지 않을경우 분리해서 작성
export type TGameUploadInput = {
  title: string;
  category: string;
  content: string;
  gameFile: File[];
  thumbnail: File[];
  stillCut: File[];
  video: string;
};

export type TGameUploadInputForm = {
  register: UseFormRegister<TGameUploadInput>;
  watch: UseFormWatch<TGameUploadInput>;
  setValue: UseFormSetValue<TGameUploadInput>;
  formState: FormState<TGameUploadInput>;
  handleSubmit: UseFormHandleSubmit<TGameUploadInput>;
};

export type TReviewInputForm = {
  comment: string;
  star: number;
  difficultyLevel: "easy" | "hard" | "";
};

export type TUserInformationInputForm = {
  email: string;
  nickname: string;
  password: string;
  password_check: string;
  game_category: string[];
  user_tech: string;
  is_maker: boolean;
};

export type TUser = {
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
  password: string;
  password_check: string;
};

export type TGameData = {
  pk: number;
  title: string;
  maker: number;
  thumbnail: string;
  star: number;
  maker_name: string;
  content: string;
  chip: number[];
  category_name: string[];
  is_liked: boolean;
};
