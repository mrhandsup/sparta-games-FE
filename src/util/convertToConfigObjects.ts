import { selectType } from "../constant/selectConfig";

export const convertToConfigObjects = <T extends selectType>(configList: T[], selectedValues: string[]): T[] => {
  return configList.filter((config) => selectedValues.includes(config.value as any));
};

export const convertToConfigValues = <T extends selectType>(configList: T[]): string[] => {
  return configList.map((config) => config.value as string);
};
