type selectType = {
  label: string;
  value: string | boolean;
  [key: string]: any;
};

const GAME_CATEGORY: selectType[] = [
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

const USER_TECH: selectType[] = [
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
    value: "All",
  },
  {
    label: "관심분야 없음",
    value: "NONE",
  },
];

const USER_TYPE: selectType[] = [
  {
    label: "플레이어",
    value: false,
  },
  {
    label: "메이커",
    value: true,
  },
];

export { USER_TECH, GAME_CATEGORY, USER_TYPE };
export type { selectType };
