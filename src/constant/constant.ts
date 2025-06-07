const CATEGORY = [
  "Action",
  "Arcade",
  "FPS",
  "Platform",
  "Rhythm",
  "Survival",
  "Adventure",
  "Casual",
  "Horror",
  "Puzzle",
  "RPG",
  "Test",
];

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

const ROLE_CHOICES: selectConfig[] = [
  {
    label: "Director",
    value: "DIR",
  },
  {
    label: "Project Manager",
    value: "PM",
  },
  {
    label: "2D Artist",
    value: "A2D",
  },
  {
    label: "3D Artist",
    value: "A3D",
  },
  {
    label: "UXUI Designer",
    value: "UXUI",
  },
  {
    label: "Client Dev",
    value: "CLNT",
  },
  {
    label: "Engine Dev",
    value: "ENG",
  },
  {
    label: "Server / Network Dev",
    value: "SRVR",
  },
  {
    label: "Sound / Audio",
    value: "AUD",
  },
  {
    label: "QA / Test",
    value: "QA",
  },
];

const USER_TECH: selectConfig[] = [
  {
    label: "Director(PM/PO)",
    value: "DIR",
  },
  {
    label: "2D Graphic",
    value: "2DG",
  },
  {
    label: "Concept Art",
    value: "CA",
  },
  {
    label: "UX/UI",
    value: "UXUI",
  },
  {
    label: "Artist",
    value: "ART",
  },
  {
    label: "3D Graphic",
    value: "3DG",
  },
  {
    label: "Modeler",
    value: "MDL",
  },
  {
    label: "Frontend",
    value: "FE",
  },
  {
    label: "Backend",
    value: "BE",
  },
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "관심분야 없음",
    value: "NONE",
  },
];

const USER_TYPE: selectConfig[] = [
  {
    label: "플레이어",
    value: false,
  },
  {
    label: "메이커",
    value: true,
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

export { CATEGORY, USER_TECH, ROLE_CHOICES, GAME_CATEGORY, USER_TYPE, GAME_CHIP, EDITOR_FORMATS };
export type { selectConfig };
