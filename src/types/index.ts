import type {
  Control,
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

//공용으로 쓰는 타입의 경우 이 파일의 작성 그렇지 않을경우 분리해서 작성
export type TGameUploadInput = {
  title: string;
  category: string;
  content: string;
  gameFile: File[];
  thumbnail: File[];
  stillCut: File[][];
  video: string;
};

export type TGameUploadInputForm = {
  register: UseFormRegister<TGameUploadInput>;
  watch: UseFormWatch<TGameUploadInput>;
  control: Control<TGameUploadInput>;
  setValue: UseFormSetValue<TGameUploadInput>;
  formState: FormState<TGameUploadInput>;
  handleSubmit: UseFormHandleSubmit<TGameUploadInput>;
  trigger: UseFormTrigger<TGameUploadInput>;
  getValues: UseFormGetValues<TGameUploadInput>;
  reset: UseFormReset<TGameUploadInput>;
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
  code?: string;
  login_type: string;
  profile_image?: File[];
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

export type TListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TGameData[];
};

export type TGameResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TGamePlayData;
  pagination: null;
  error_code: null;
};

export type TReviewResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: {
    all_reviews: TReviewData[];
    my_review?: TReviewData;
  };
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TGameData = {
  id: number;
  title: string;
  thumbnail: string;
  star: number;
  maker_data: {
    id: number;
    nickname: string;
  };
  content: string;
  chips: TGameChip[];
  is_liked: boolean;
  category_data: {
    id: number;
    name: string;
  }[];
};

export type TGameAdminData = {
  category_data: {
    id: number;
    name: string;
  }[];
  game_register_logs: {
    content: string;
    created_at: string;
  }[];
  id: number;
  register_state: number;
  title: string;
  maker_data: {
    id: number;
    nickname: string;
  };
};

export type TGamePlayData = TGameData & {
  youtube_url: string;
  gamefile: string;
  gamepath: string;
  register_state: number;
  is_visible: boolean;
  review_cnt: number;
  base_control: string;
  screenshot: {
    id: number;
    src: string;
  }[];
  category: {
    id: number;
    name: string;
  }[];
};

export type TGameChip = { id: number; name: "Daily Top" | "Review Top" | "Bookmark Top" | "Long Play" | "New Game" };

export type TCategoryItem = {
  id: number;
  name: string;
};

export type TCategoryListResponse = {
  status: string;
  message: string | null;
  data: TCategoryItem[];
  pagination: null;
  error_code: null;
};
