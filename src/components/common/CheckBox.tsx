import nonCheckBox from "../../assets/nonCheckBox.svg";
import checkBox from "../../assets/checkBox.svg";

type Props = {
  check: boolean;
  onClickHandler: () => void;
};

const CheckBox = ({ check, onClickHandler }: Props) => {
  return check ? (
    <img
      src={checkBox}
      alt="checkBox"
      onClick={onClickHandler}
      className="absolute right-0 bottom-0 z-10 cursor-pointer"
    />
  ) : (
    <img
      src={nonCheckBox}
      alt="checkBox"
      onClick={onClickHandler}
      className="absolute right-0 bottom-0 z-10 cursor-pointer"
    />
  );
};

export default CheckBox;
