import nonCheckBox from "../../src/assets/nonCheckBox.svg";
import checkBox from "../../src/assets/checkBox.svg";

type Props = {
  checked: boolean;
  onToggle: () => void;
};

export default function SpartaCheckBox({ checked, onToggle }: Props) {
  return (
    <img
      src={checked ? checkBox : nonCheckBox}
      alt={checked ? "선택됨" : "선택 안 됨"}
      onClick={onToggle}
      className="cursor-pointer w-6 h-6"
    />
  );
}
