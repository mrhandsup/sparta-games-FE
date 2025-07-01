//공용으로 쓰는 타입의 경우 이 파일의 작성 그렇지 않을경우 분리해서 작성

import radioGroupsData from "../util/constance/radioGroupsData";

export type RadioGroupKey = keyof typeof radioGroupsData;
export type RadioGroupData = typeof radioGroupsData;

export type TApiResponse<TData> = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TData;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TTeamBuildSearchedPosts = {
  search_teambuild_posts: TTeamBuildPostListItem[];
};

export type TTeamBuildProfileSearchedPosts = {
  search_teambuild_profiles: TTeamBuildProfileListItem[];
};

export type TCommonTeamBuildPost = {
  id: number;
  title: string;
  want_roles: string[];
  purpose: "PORTFOLIO" | "CONTEST" | "STUDY" | "COMMERCIAL";
  duration: string;
  deadline: string;
  thumbnail: string;
  author_data: {
    id: number;
    nickname: string;
    image: string | null;
  };
};

export type TTeamBuildCommentData = {
  id: number;
  content: string;
  create_dt: Date;
  update_dt: Date;
  is_visible: boolean;
  post_id: number;
  author_data: {
    id: number;
    nickname: string;
    image: string | null;
  };
};
export type TTeamBuildProfileResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TTeamBuildProfileListItem[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TTeamBuildProfileUserResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TTeamBuildProfileListItem;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TTeamBuildProfileListItem = TCommonTeamBuildPost & {
  [K in keyof RadioGroupData]: string;
} & {
  profile_image: File[] | string | null;
  career: string;
  my_role: string;
  tech_stack: string;
  game_genre: string[];
  portfolio: {
    link: string;
    type: string;
  }[];
  contact: string;
  content: string;
};

export type TTeamBuildPostResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: {
    team_build_posts: TTeamBuildPostListItem[];
    recommended_posts: TTeamBuildRecommenedPostListItem[];
  };
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TTeamBuildPostListItem = TCommonTeamBuildPost & {
  status_chip: "모집중";
  is_visible: boolean;
};

export type TTeamBuildDetailResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TTeamBuildPostDetail;

  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TTeamBuildPostDetail = TCommonTeamBuildPost & {
  contact: string;
  content: string;
  meeting_type: string;
  create_dt: string;
  status_chip: "모집중" | "모집마감";
  thumbnail_basic: boolean;
};

export type TTeamBuildRecommenedPostListItem = TTeamBuildPostListItem & {
  content: string;
};

export type TProjectRecruitForm = {
  [K in keyof RadioGroupData]: string;
} & {
  want_roles: string[];
  deadline: Date;
  contact: string;
  thumbnail: string | File[];
  thumbnail_basic: "default";
  title: string;
  content: string;
};

export type TProfileRegisterForm = {
  [K in keyof RadioGroupData]: string;
} & {
  profile_image: string | File[];
  career: string;
  my_role: string;
  tech_stack: string;
  game_genre: string;
  link: string[];
  contact: string;
  title: string;
  content: string;
  portfolio: {
    link: string;
    type: string;
  }[];
};

export type TRandGame = {
  category_name: string;
  game_list: TGameData[];
};

export type TMainHttpResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: {
    trending_games: TGameData[];
    recent: TGameData[];
    updated: TGameData[];
    rand1: TRandGame;
    rand2: TRandGame;
    rand3: TRandGame;
  };
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TGameUploadInput = {
  title: string;
  category: string;
  content: string;
  gameFile: File[];
  thumbnail: File[];
  stillCut: File[][];
  video: string;
};

export type TUserInformationInputForm = {
  email: string;
  nickname: string;
  password: string;
  password_check: string;
  new_password: string;
  new_password_check: string;
  game_category: string;
  is_maker: boolean;
  code?: string;
  login_type: string;
  profile_image?: File[];
};

export type TUserDataResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TUserData;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TUserData = {
  user_id: number;
  nickname: string;
  email: string;
  profile_image: string;
  is_staff: boolean;
  is_maker: boolean;
  introduce: string;
  login_type: string;
  game_category: any[];
  password: string;
  password_check: string;
};

export type TGameDataResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TGameData[];
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

export type TGameChip = { id: number; name: "Daily Top" | "Review Top" | "Bookmark Top" | "Long Play" | "New Game" };

export type TGamePlayDataResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TGamePlayData;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
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

export type TReviewInputForm = {
  content: string;
  star: number;
  difficulty: "easy" | "normal" | "hard" | "";
};

export type TCategoryListResponse = {
  status: "success" | "fail" | "error";
  message: string | null;
  data: TCategoryItem[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  error_code: string | null;
};

export type TCategoryItem = {
  id: number;
  name: string;
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
