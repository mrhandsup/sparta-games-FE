import React from "react";
import useModalToggles from "../hook/useModalToggles";
import closeModalIcon from "../assets/common/closeModalIcon.svg";
import closeModalIconPrimary from "../assets/common/closeModalIconPrimary.svg";
import closeModalIconAlert from "../assets/common/closeModalIconAlert.svg";
import closeModalIconError from "../assets/common/closeModalIconError.svg";

export type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalId: string;
  closeOnClickOutside?: boolean;
  title?: string;
  type?: "primary" | "alert" | "error" | "grey";
};

const SpartaModal = ({
  isOpen,
  onClose,
  children,
  modalId,
  closeOnClickOutside = true,
  title,
  type = "primary",
}: TModalProps) => {
  const { modalRefs } = useModalToggles([modalId]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside) {
      onClose();
    }
  };

  const getStyledType = () => {
    switch (type) {
      case "primary":
        return "border-primary-400" + " shadow-primary";
      case "alert":
        return "border-alert-default" + " shadow-alert";
      case "error":
        return "border-error-default" + " shadow-error";
      default:
        return "border-primary-400" + " shadow-primary";
    }
  };

  const getCloseModalIcon = () => {
    switch (type) {
      case "primary":
        return closeModalIconPrimary;
      case "alert":
        return closeModalIconAlert;
      case "error":
        return closeModalIconError;
      default:
        return closeModalIcon;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRefs[modalId]}
        className={`bg-gray-800 p-10 w-fit max-w-[1200px] mx-4 transform transition-all duration-300 ease-in-out animate-modalSlideIn rounded-[20px] border-[1px] border-solid ${getStyledType()}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <div
              className={`text-[24px] ${
                type === "error"
                  ? "text-error-default"
                  : type === "alert"
                  ? "text-alert-default"
                  : type === "primary"
                  ? "text-primary-400"
                  : "text-gray-500"
              } 
              font-DungGeunMo `}
            >
              {title}
            </div>
            <button onClick={onClose}>
              <img src={getCloseModalIcon()} alt="close modal" className="w-5" />
            </button>
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default SpartaModal;
