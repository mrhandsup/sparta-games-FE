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

const USER_TECH: selectConfig[] = [
  {
    label: "Director(PM/PO)",
    value: "director",
  },
  {
    label: "2D Graphic",
    value: "2d_graphic",
  },
  {
    label: "Concept Art",
    value: "concept_art",
  },
  {
    label: "UX/UI",
    value: "ux_ui",
  },
  {
    label: "Artist",
    value: "artist",
  },
  {
    label: "3D Graphic",
    value: "3d_graphic",
  },
  {
    label: "Modeler",
    value: "modeler",
  },
  {
    label: "Frontend",
    value: "frontend",
  },
  {
    label: "Backend",
    value: "backend",
  },
  {
    label: "All",
    value: "all",
  },
  {
    label: "관심분야 없음",
    value: "none",
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

export { USER_TECH, GAME_CATEGORY, USER_TYPE };
export type { selectConfig };
