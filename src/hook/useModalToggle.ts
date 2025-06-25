import { useState } from "react";

import useMouseClickClose from "./useMouseClickClose";

const useModalToggle = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const { modalRef } = useMouseClickClose(modalToggle, setModalToggle);

  const onClickModalToggleHandler = () => {
    setModalToggle(!modalToggle);
  };

  return { modalToggle, modalRef, onClickModalToggleHandler };
};

export default useModalToggle;
