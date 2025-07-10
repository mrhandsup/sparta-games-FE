type SpartaRadioGroupItemProps = {
  /**
   * Input 제목
   */
  label?: string;
  /**
   * Input 내부 글씨 크기
   */
  size?: "small" | "medium" | "large";
  /**
   * Input 스타일 타입 (기본 / 채워짐)
   */
  type?: "standard" | "filled";
  /**
   * Input 색상 타입
   */
  colorType?: "primary" | "alert" | "error" | "grey";
  /**
   * Input 크기 조절용 스타일 속성 (너비, 높이 등)
   */
  width?: string;
  /**
   * Input name 속성
   */
  name: string;
  /**
   * 화면에 보여질 라디오 옵션 배열
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * 현재 선택된 값
   */
  value: string;
  /**
   * 값이 변경될 때 호출되는 콜백
   */
  onChange: (value: string) => void;
};

export function SpartaRadioGroupItem({
  label,
  size = "large",
  type = "standard",
  colorType = "primary",
  width = "w-full",
  name,
  options,
  value,
  onChange,
}: SpartaRadioGroupItemProps) {
  const getButtonStyles = (): string => {
    const baseStyles =
      "rounded-md transition-colors duration-200 box-border flex items-center justify-center cursor-pointer";

    const sizeStyles = {
      small: "h-10 text-title-16 ",
      medium: "h-12 text-title-18",
      large: "h-14 text-title-22",
    };

    const colorDict = {
      primary: {
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
        filled: "bg-gray-300 ",
        standard: "border-2 border-gray-300 text-gray-300",
      },
    };

    return `${baseStyles} ${colorDict[colorType][type]} ${sizeStyles[size]} ${width} hover:shadow-md`;
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-baseline">
        <label className="text-gray-50 text-title-16">{label}</label>
      </div>

      <div className="flex gap-1.5">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={`${
                isSelected ? "bg-gray-600 text-white" : "border border-solid border-gray-400 text-white font-normal"
              } ${getButtonStyles()}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
