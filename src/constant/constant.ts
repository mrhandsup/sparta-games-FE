type selectConfig = {
  label: string;
  value: string | boolean;
  [key: string]: any;
};

const GAME_CATEGORY: selectConfig[] = [
  {
    label: "Action",
    value: "Action",
  },
  {
    label: "Adventure",
    value: "Adventure",
  },
  {
    label: "Arcade",
    value: "Arcade",
  },
  {
    label: "Casual",
    value: "Casual",
  },
  {
    label: "FPS",
    value: "FPS",
  },
  {
    label: "Horror",
    value: "Horror",
  },
  {
    label: "Platform",
    value: "Platform",
  },
  {
    label: "Puzzle",
    value: "Puzzle",
  },

  {
    label: "RPG",
    value: "RPG",
  },

  {
    label: "Survival",
    value: "Survival",
  },
];

const GAME_CHIP = {
  "Daily Top": "🔥 인기 급상승",
  "Review Top": "💬 평가가 많은",
  "Bookmark Top": "🔖 북마크 많은",
  "Long Play": "🕹️ 오래 플레이",
  "New Game": "🆕 새로 등록된",
  "Project Purpose": "🔥 취업용 포트폴리오",
  NORMAL: "🟧 NORMAL",
  EASY: "🟩 EASY",
  HARD: "🟥 HARD",
};

const EDITOR_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
  "float",
  "height",
  "width",
];

export { GAME_CATEGORY, GAME_CHIP, EDITOR_FORMATS };
export type { selectConfig };
