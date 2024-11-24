type Props = {
  content: string;
  disabled?: boolean;
  type?: "standard" | "filled";
  onClick: () => void;
};

const SpartaButton = ({ disabled = false, content, type = "standard", onClick }: Props) => {
  // 동적 스타일을 적용하기 위한 함수
  const getButtonStyles = (): string => {
    // 기본 스타일
    const baseStyles = "w-full h-14 text-title-18 rounded-lg transition-colors duration-200";

    // disabled 상태일 때의 스타일
    const disableStyles = {
      standard: "bg-white border-2 border-gray-400 text-gray-400 ",
      filled: "bg-gray-400 text-gray-900",
    };

    // disabled 상태일 때
    if (disabled) {
      return `${baseStyles} ${disableStyles[type]} cursor-not-allowed`;
    }

    // type에 따른 스타일
    const typeStyles = {
      standard: "bg-white border-2 border-primary-500 text-primary-500 hover:border-primary-400 hover:text-primary-400",
      filled: "bg-primary-500 text-primary-950 hover:bg-primary-400",
    };

    return `${baseStyles} ${typeStyles[type]}`;
  };

  return (
    <button type="submit" disabled={disabled} onClick={onClick} className={getButtonStyles()}>
      {content}
    </button>
  );
};

export default SpartaButton;
