import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type Props = {
  label: string;
  inputProps: any;
  register?: any;
  type: "large" | "medium" | "small";
  subLabel?: {
    default: string;
    error: string;
    pass: string;
  };
  error?: boolean;
  pass?: boolean;
  onClear?: () => void;
};

const SpartaTextField = ({ label, inputProps, register, type = "medium", subLabel, error, pass, onClear }: Props) => {
  const subLabelBranch = () => {
    if (error && !pass) {
      return subLabel?.error;
    } else if (!error && pass) {
      return subLabel?.pass;
    } else {
      return subLabel?.default;
    }
  };

  const colorBranch = () => {
    if (error && !pass) {
      return "text-error-hover";
    } else if (!error && pass) {
      return "text-primary-500";
    } else {
      return "text-gray-500";
    }
  };

  const inputBorderBranch = () => {
    if (error && !pass) {
      return "border-error-hover";
    } else if (!error && pass) {
      return "border-primary-500";
    } else {
      return "border-gray-500";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-baseline">
        <label
          className={`text-gray-100 ${
            type === "large" ? "text-heading-24" : type === "medium" ? "text-title-18" : "text-title-16"
          }`}
        >
          {label}
        </label>
        <p className={`${type === "small" ? "text-caption-14" : "text-caption-16"} ${colorBranch()}`}>
          {subLabelBranch()}
        </p>
      </div>
      <div className="relative">
        <input
          {...register}
          {...inputProps}
          className={`w-full py-3 px-4 border border-solid ${inputBorderBranch()} rounded-md ${
            type === "small" ? "text-body-16" : "text-body-18"
          } text-gray-200 bg-transparent ${onClear ? "pr-10" : ""}`}
        />
        {!inputProps.disabled && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <IoCloseCircleOutline size={type === "small" ? 18 : 20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SpartaTextField;
