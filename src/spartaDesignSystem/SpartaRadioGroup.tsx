import { Controller, Control, UseFormWatch, UseFormSetValue, FieldValues } from "react-hook-form";
import { SpartaRadioGroupItem } from "./SpartaRadioGroupItem";
import radioGroupsData from "../util/constance/radioGroupsData";
import { useEffect } from "react";
import type { Path, PathValue } from "react-hook-form";

type SpartaRadioGroupProps<T extends FieldValues> = {
  groupsToShow: Path<T>[];
  control: Control<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
};

export default function SpartaRadioGroup<T extends FieldValues>({
  groupsToShow,
  control,
  watch,
  setValue,
}: SpartaRadioGroupProps<T>) {
  useEffect(() => {
    Object.entries(radioGroupsData).forEach(([name, data]) => {
      const key = name as Path<T>;
      const currentValue = watch(key);
      if (currentValue === undefined && data.options.length > 0) {
        setValue(key, data.options[0].value as PathValue<T, typeof key>);
      }
    });
  }, [setValue, watch]);

  return (
    <>
      {groupsToShow.map((groupName) => {
        const group = radioGroupsData[groupName as keyof typeof radioGroupsData];
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
