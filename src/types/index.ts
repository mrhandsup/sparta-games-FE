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
  content: string;
  star: number;
  difficulty: "easy" | "normal" | "hard" | "";
};

export type TReviewData = {
  id: number;
  author_name: string;
  src: null;
  like_count: number;
  dislike_count: number;
  user_is_like: number;
  content: string;
  star: number;
  difficulty: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  game_id: number;
  author_id: number;
};

export type TReviewResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    all_reviews: TReviewData[];
    my_review?: TReviewData;
  };
};

export type ReviewFormData = {
  title: string;
  content: string;
  rating: number;
};

export type TUserInformationInputForm = {
  email: string;
  nickname: string;
  password: string;
  password_check: string;
  new_password: string;
  new_password_check: string;
  game_category: string;
  user_tech: string;
  is_maker: boolean;
  email_code?: string;
  login_type: string;
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
  chip_names: TGameChip[];
  category_name: string[];
  is_liked: boolean;
};

export type TListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TGameData[];
};

export type TGamePlayData = {
  id: number;
  category: {
    pk: number;
    name: string;
  }[];
  maker_name: string;
  title: string;
  is_liked: boolean;
  thumnail: null;
  youtube_url: string;
  content: string;
  gamepath: string;
  base_control: string;
  screenshot: {
    id: number;
    src: string;
  }[];
};

export type TGameChip = "Daily Top" | "Review Top" | "Bookmark Top" | "Long Play" | "New Game";

export type TCategoryListResponse = {
  pk: number;
  name: string;
}[];
