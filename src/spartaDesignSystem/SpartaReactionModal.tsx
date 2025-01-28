import SpartaModal from "./SpartaModal";
import SpartaButton from "./SpartaButton";
import type { TModalProps } from "./SpartaModal";

type btnConfig = {
  text: string;
  onClick: () => void;
};

export type TSpartaReactionModalProps = Pick<TModalProps, "type" | "isOpen" | "modalId" | "onClose"> & {
  title: string;
  content: string;
  btn1: btnConfig;
  btn2?: btnConfig;
};

const SpartaReactionModal = ({
  title,
  content,
  type = "primary",
  btn1,
  btn2,
  isOpen,
  modalId,
  onClose,
}: TSpartaReactionModalProps) => {
  const titleColor =
    type === "primary"
      ? "text-primary-400"
      : type === "alert"
      ? "text-alert-default"
      : type === "error"
      ? "text-error-default"
      : "text-white";

  return (
    <SpartaModal isOpen={isOpen} onClose={onClose} modalId={modalId} type={type}>
      <div className="min-w-80 flex flex-col items-center gap-4">
        <div className={`text-[18px] font-medium ${titleColor} font-DungGeunMo`}>{title}</div>
        <div
          className="text-[16px] font-light leading-7 my-2 text-white text-center"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        {btn2 && (
          <SpartaButton content={btn2.text} onClick={btn2.onClick} type={"filled"} colorType="grey" size="small" />
        )}
        <SpartaButton content={btn1.text} onClick={btn1.onClick} type={"filled"} colorType={type} size="small" />
      </div>
    </SpartaModal>
  );
};

export default SpartaReactionModal;
