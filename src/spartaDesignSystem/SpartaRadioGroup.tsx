type Props = {
  /**
   * 텍스트필드의 라벨
   */
  label: string;
  /**
   * 텍스트필드의 크기
   */
  size?: "small" | "medium" | "large";
  type?: "standard" | "filled";
  colorType?: "primary" | "alert" | "error" | "grey";
  width?: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

export default function SpartaRadioGroup({
  label,
  size = "large",
  type = "standard",
  colorType = "primary",
  width = "w-full",
  name,
  options,
  value,
  onChange,
}: Props) {
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
        <label className="text-gray-100 text-title-16">{label}</label>
      </div>

      <div className="flex gap-3">
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
