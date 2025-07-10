import { FormControl, Select, OutlinedInput, Box, Chip, MenuItem, SelectChangeEvent } from "@mui/material";
import { Controller } from "react-hook-form";
import { selectConfig } from "../constant/constant";

type Props = {
  /**
   * 텍스트필드의 라벨
   */
  label: string;
  /**
   * select options
   */
  options: selectConfig[];
  /**
   * control from react-hook-form
   */
  control: any;
  /**
   * rules from react-hook-form
   */
  rules?: any;
  /**
   * field name for form
   */
  name: string;
  /**
   * 패스 상태
   */
  pass?: boolean;
  warning?: boolean;
  /**
   * 서브라벨
   */
  subLabel?: {
    default: string;
    error: string;
    pass: string;
    warning?: string;
  };
  /**
   * 다중 선택 가능 여부
   */
  multiple?: boolean;
  /**
   * 최대 선택 가능 개수
   */
  maxCount?: number;
  /**
   * 에러 상태
   */
  error?: boolean;
  /**
   * 인풋 placeholder 텍스트
   */
  placeHolderText?: string;
};

const SpartaChipSelect = ({
  label,
  options,
  control,
  rules,
  name,
  pass,
  subLabel,
  multiple,
  maxCount,
  error,
  placeHolderText,
  warning,
}: Props) => {
  const ITEM_HEIGHT = 40;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        backgroundColor: "#1A1A1A",
      },
    },
  };
  const selectStyles = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: pass ? "#2DFF29" : error ? "#FF8F8F" : "#737373", // primary-500 또는 gray-400
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: pass ? "#2DFF29" : error ? "#FF8F8F" : "#737373",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: error ? "#FF8F8F" : "#2DFF29", // primary-500
    },
    "& .MuiSelect-icon": {
      color: "#E5E5E5", // gray-200
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px 14px",
    },
    backgroundColor: "#171717",
  };

  const menuItemStyles = {
    "&.MuiMenuItem-root": {
      fontFamily: "DungGeunMo",
      color: "#E5E5E5",
      // backgroundColor: "#1A1A1A",
      backgroundColor: "#171717",
      "&:hover": {
        backgroundColor: "#333333",
      },
      "&.Mui-selected": {
        backgroundColor: "#2D2D2D",
        "&:hover": {
          backgroundColor: "#333333",
        },
      },
    },
  };

  const chipStyles = {
    backgroundColor: "white", // primary-500
    // margin: "2px",
    fontFamily: "DungGeunMo",
    fontSize: "14px",
    padding: "1px",
    height: "23px",
    borderRadius: "4px",
    "& .MuiChip-deleteIcon": {
      color: "#FFFFFF",
      "&:hover": {
        color: "#E5E5E5",
      },
    },
  };

  const colorBranch = () => {
    if (pass) {
      return "text-primary-500";
    } else if (error) {
      return "text-error-hover";
    } else if (warning) {
      return "text-alert-default";
    } else {
      return "text-gray-100";
    }
  };

  const subLabelBranch = () => {
    if (pass) {
      return subLabel?.pass;
    } else if (error) {
      return subLabel?.error;
    } else if (warning) {
      return subLabel?.warning;
    } else {
      return subLabel?.default;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-baseline">
        <label className="text-white text-title-16">{label}</label>
        <p className={`text-caption-14 ${colorBranch()}`}>
          {subLabelBranch()}
          {/* {multiple && maxCount && `(최대 ${maxCount}개 선택 가능)`} */}
        </p>
      </div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={multiple ? [] : ""}
        render={({ field: { onChange, value } }) => (
          <FormControl className={`w-full ${pass ? "border-primary-500" : "border-gray-100"}`}>
            <Select
              displayEmpty
              multiple={multiple}
              value={value || (multiple ? [] : "")}
              onChange={(event: SelectChangeEvent<string[] | string>) => {
                const newValue = event.target.value;
                // 다중 선택이고 최대 선택 개수가 지정된 경우
                if (multiple && maxCount) {
                  const selectedValues = typeof newValue === "string" ? newValue.split(",") : newValue;
                  const currentValues = Array.isArray(value) ? value : [];

                  // 선택 해제하는 경우는 항상 허용
                  if (selectedValues.length < currentValues.length) {
                    onChange(selectedValues);
                  }
                  // 선택 추가의 경우 최대 개수 체크
                  else if (selectedValues.length <= maxCount) {
                    onChange(selectedValues);
                  }
                } else {
                  onChange(newValue);
                }
              }}
              input={<OutlinedInput placeholder="선택해주세요" />}
              renderValue={(selected) => {
                if (!selected || selected === "") {
                  return <span style={{ color: "#BFBFBF" }}>{placeHolderText}</span>;
                }
                if (multiple) {
                  const selectedArray = Array.isArray(selected) ? selected : [selected];
                  if (selectedArray.length === 0) {
                    return <span className="text-gray-400">{placeHolderText}</span>;
                  }
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedArray.map((value) => {
                        const option = options.find((opt) => opt.value === value);
                        return <Chip key={value} label={option?.label || value} sx={chipStyles} />;
                      })}
                    </Box>
                  );
                } else {
                  const option = options.find((opt) => opt.value === selected);
                  return <Chip key={value} label={option?.label} sx={chipStyles} />;
                }
              }}
              MenuProps={MenuProps}
              sx={selectStyles}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.label}
                  value={option.value as string}
                  sx={{
                    ...menuItemStyles,
                    ...(multiple &&
                    maxCount &&
                    Array.isArray(value) &&
                    value.length >= maxCount &&
                    !value.includes(option.value as string)
                      ? {
                          opacity: 0.5,
                          pointerEvents: "none",
                          color: "#6B7280",
                        }
                      : {}),
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
};

export default SpartaChipSelect;
