import { ChangeEvent, useState } from "react";

const useInput = () => {
  const [input, setInput] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const reset = () => {
    setInput("");
  };

  return { input, onChangeHandler, reset };
};

export default useInput;
