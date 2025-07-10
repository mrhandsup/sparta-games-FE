import { RefObject, SetStateAction, useEffect, useRef } from "react";

const useMouseClickClose = (modalCheck: boolean, set: (value: SetStateAction<boolean>) => void) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const mouseClickModalClose = (
    e: MouseEvent,
    modal: boolean,
    ref: RefObject<HTMLDivElement>,
    set: (value: SetStateAction<boolean>) => void,
  ) => {
    const { target } = e;
    if (modal && ref.current && !ref.current.contains(target as Node)) {
      set(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => mouseClickModalClose(e, modalCheck, modalRef, set));
  }, [modalCheck, set]);

  return { modalRef };
};

export default useMouseClickClose;
