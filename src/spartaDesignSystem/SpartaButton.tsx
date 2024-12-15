type Props = {
  content: string;

  disabled?: boolean;

  type?: "standard" | "filled";

  size?: "small" | "medium" | "large";

  colorType?: "main" | "alert" | "error" | "grey";

  onClick: () => void;
};

const SpartaButton = ({
  disabled = false,

  content,

  type = "standard",

  size = "large",

  colorType = "main",

  onClick,
}: Props) => {
  // 동적 스타일을 적용하기 위한 함수

  const getButtonStyles = (): string => {
    // 기본 스타일

    const baseStyles = "w-full rounded-lg transition-colors duration-200";

    // size에 따른 스타일

    const sizeStyles = {
      small: "py-2 px-4 text-title-16",

      medium: "py-3 px-5 text-title-18",

      large: "py-4 px-6 text-title-22",
    };

    const colorDict = {
      main: {
        filled: "bg-primary-500 hover:bg-primary-300",

        standard: "border-2 border-primary-500 text-primary-500 hover:text-primary-300 hover:border-primary-300",
      },

      alert: {
        filled: "bg-alert-default hover:bg-alert-hover",

        standard: "border-2 border-alert-default text-alert-default hover:text-alert-hover hover:border-alert-hover",
      },

      error: {
        filled: "bg-error-default hover:bg-error-hover",

        standard: "border-2 border-error-default text-error-default hover:text-error-hover hover:border-error-hover",
      },

      grey: {
        filled: "bg-gray-500 hover:bg-gray-300",

        standard: "border-2 border-gray-500 text-gray-500 hover:text-gray-300 hover:border-gray-300",
      },
    };

    return `${baseStyles} ${colorDict[colorType][type]} ${sizeStyles[size]} ${
      disabled && "cursor-not-allowed"
    } hover:shadow-md`;
  };

  return (
    <button type="submit" disabled={disabled} onClick={onClick} className={getButtonStyles()}>
      {content}
    </button>
  );
};

export default SpartaButton;
