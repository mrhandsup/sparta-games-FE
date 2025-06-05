import { Controller, Control, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { SpartaRadioGroupItem } from "./SpartaRadioGroupItem";
import radioGroupsData from "../util/constance/radioGroupsData";
import { useEffect } from "react";
import type { TProjectRecruitForm, RadioGroupKey } from "../types";

type SpartaRadioGroupProps = {
  groupsToShow: RadioGroupKey[];
  control: Control<TProjectRecruitForm>;
  watch: UseFormWatch<TProjectRecruitForm>;
  setValue: UseFormSetValue<TProjectRecruitForm>;
};

export default function SpartaRadioGroup({ groupsToShow, control, watch, setValue }: SpartaRadioGroupProps) {
  useEffect(() => {
    Object.entries(radioGroupsData).forEach(([name, data]) => {
      const key = name as RadioGroupKey;
      const currentValue = watch(key);
      if (currentValue === undefined && data.options.length > 0) {
        setValue(key, data.options[0].value);
      }
    });
  }, [setValue, watch]);

  return (
    <>
      {groupsToShow.map((groupName) => {
        const group = radioGroupsData[groupName];
        if (!group) return null;

        return (
          <Controller
            key={groupName}
            name={groupName}
            control={control}
            render={({ field }) => (
              <SpartaRadioGroupItem
                label={group.label}
                name={field.name}
                options={group.options}
                value={field.value}
                onChange={field.onChange}
                size="small"
                colorType="grey"
                width="w-[120px] h-[50px]"
              />
            )}
          />
        );
      })}
    </>
  );
}
