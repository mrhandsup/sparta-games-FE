import { useEffect } from "react";
import { Controller, Control, UseFormWatch, UseFormSetValue, FieldValues } from "react-hook-form";
import type { Path, PathValue } from "react-hook-form";
import { SpartaRadioGroupItem } from "./SpartaRadioGroupItem";

type SpartaRadioGroupProps<T extends FieldValues> = {
  groupsToShow: Path<T>[];
  control: Control<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  labelOverrides?: Partial<Record<Path<T>, string>>;
  radioGroupsData: {
    [key: string]: {
      label: string;
      options: { label: string; value: string }[];
    };
  };
};

export default function SpartaRadioGroup<T extends FieldValues>({
  groupsToShow,
  control,
  watch,
  setValue,
  labelOverrides = {},
  radioGroupsData,
}: SpartaRadioGroupProps<T>) {
  // 사용자가 아무 선택하지 않더라도 radio 옵션 중 첫 번째 항목을 기본값으로 미리 선택
  useEffect(() => {
    groupsToShow.forEach((name) => {
      const key = name as Path<T>;
      const currentValue = watch(key);
      const groupData = radioGroupsData[key];

      if (currentValue === undefined && groupData?.options && groupData.options.length > 0) {
        setValue(key, groupData.options[0].value as PathValue<T, typeof key>);
      }
    });
  }, [groupsToShow, setValue, watch, radioGroupsData]);

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
                label={labelOverrides[groupName] || group.label}
                name={field.name}
                options={group.options}
                value={field.value}
                onChange={field.onChange}
                size="small"
                colorType="grey"
                width="w-[110px] h-[47px] border-[1px]"
              />
            )}
          />
        );
      })}
    </>
  );
}
