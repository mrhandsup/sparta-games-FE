import { useState } from "react";

const useModalToggle = () => {
  const [modalToggle, setModalToggle] = useState(false);

  const onClickModalToggleHandler = () => {
    setModalToggle(!modalToggle);
  };

  return { modalToggle, onClickModalToggleHandler };
};

export default useModalToggle;
