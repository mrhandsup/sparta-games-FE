import { IoCloseCircleOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

type Props = {
  /**
   * 텍스트필드의 라벨
   */
  label: string;
  /**
   * input 태그의 속성
   */
  inputProps: any;
  /**
   * react-hook-form의 register
   */
  register?: any;
  /**
   * 텍스트필드의 크기
   */
  type: "large" | "medium" | "small";
  /**
   * 서브라벨
   */
  subLabel?: {
    default: string;
    error: string;
    pass: string;
  };
  /**
   * 에러 상태
   */
  error?: boolean;
  /**
   * 패스 상태
   */
  pass?: boolean;
  /**
   * 클리어 버튼 클릭 시
   */
  onClear?: () => void;
  /**
   * 비밀번호 타입
   */
  passwordType?: boolean;
  /**
   * 버튼 컨텐츠
   */
  btnContent?: React.ReactNode;
  /**
   * 인풋 우측 아이콘
   */
  rightIcon?: string;
  /**
   * 아이콘 클릭시 이벤트
   */
  onRightIconClick?: () => void;
};

const SpartaTextField = ({
  label,
  inputProps,
  register,
  type = "medium",
  subLabel,
  error,
  pass,
  onClear,
  passwordType,
  btnContent,
  rightIcon,
  onRightIconClick,
}: Props) => {
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

  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      <div className="flex w-full items-center gap-2">
        <div className={`relative ${btnContent ? "w-[80%]" : "w-full"} `}>
          <input
            {...register}
            {...inputProps}
            className={`w-full py-3 px-4 border border-solid ${inputBorderBranch()} rounded-md ${
              type === "small" ? "text-body-16" : "text-body-18"
            } text-gray-200 bg-transparent ${onClear ? "pr-10" : ""}`}
            type={!passwordType || showPassword ? "text" : "password"}
          />
          {!inputProps.disabled && onClear && !passwordType && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <IoCloseCircleOutline size={type === "small" ? 18 : 20} />
            </button>
          )}
          {passwordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {showPassword ? (
                <IoEyeSharp size={type === "small" ? 18 : 20} />
              ) : (
                <FaEyeSlash size={type === "small" ? 18 : 20} />
              )}{" "}
            </button>
          )}

          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              <img src={rightIcon} alt="날짜 선택" className="w-5 h-5" />
            </button>
          )}
        </div>
        {btnContent && <div className="w-[20%] ">{btnContent}</div>}
      </div>
    </div>
  );
};

export default SpartaTextField;
