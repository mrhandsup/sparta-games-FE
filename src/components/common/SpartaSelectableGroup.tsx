import React from "react";

type TSpartaSelectableGroupProps = {
  /**
   * 선택 가능한 데이터
   */
  selectableData: { label: string; value: any }[];
  /**
   * 선택된 데이터 변경 시 호출되는 함수
   */
  onChangeSelectedData: (selectedData: { label: string; value: any }[]) => void;
  /**
   * 다중 선택 가능 여부
   */
  isMultipleSelect?: boolean;
  /**
   * 초기 선택 데이터
   */
  initialSelectedData?: { label: string; value: any }[];
  /**
   * 초기화 버튼 유무
   */
  isResetButton?: boolean;
  /**
   * disabled 여부
   */
  disabled?: boolean;
};

const SpartaSelectableGroup = (props: TSpartaSelectableGroupProps) => {
  //* State
  const [selectedData, setSelectedData] = React.useState<{ label: string; value: any }[]>([]);

  //* Function
  /**
   * 선택 시 호출되는 함수
   */
  const onSelect = (data: { label: string; value: any }) => {
    if (props.disabled) return;
    if (props.isMultipleSelect) {
      // 다중 선택
      if (selectedData.find((item) => item.value === data.value)) {
        // 이미 선택된 데이터라면 제거
        setSelectedData(selectedData.filter((item) => item.value !== data.value));
        props.onChangeSelectedData(selectedData.filter((item) => item.value !== data.value));
      } else {
        // 선택되지 않은 데이터라면 추가
        setSelectedData([...selectedData, data]);
        props.onChangeSelectedData([...selectedData, data]);
      }
    } else {
      // 단일 선택
      setSelectedData([data]);
      props.onChangeSelectedData([data]);
    }
  };
  /**
   * 리셋 버튼 클릭 시
   */
  const onClickResetButton = () => {
    if (props.disabled) return;
    setSelectedData([]);
    props.onChangeSelectedData([]);
  };

  //* Hooks

  React.useEffect(() => {
    if (props.initialSelectedData) {
      setSelectedData(props.initialSelectedData);
    }
  }, [props.initialSelectedData]);

  //* Style
  const getButtonStyle = (index: number) => {
    const isFirst = index === 0;
    const isLast = index === props.selectableData.length - 1;
    const isSelected = selectedData.find((data) => data.value === props.selectableData[index].value);

    let roundedClass = "";
    if (props.selectableData.length === 2) {
      // 2개일 때는 왼쪽, 오른쪽 모서리만 처리
      roundedClass = isFirst ? "rounded-l-md" : "rounded-r-md";
    } else {
      // 2개 이상일 때는 각 모서리 처리
      if (isFirst) roundedClass = "rounded-tl-md";
      if (isLast && props.selectableData.length % 2 === 0) roundedClass = "rounded-br-md";
      if (props.selectableData.length % 2 === 0 && index === 1) roundedClass = "rounded-tr-md";
      if (props.selectableData.length % 2 === 0 && index === props.selectableData.length - 2)
        roundedClass = "rounded-bl-md";
    }

    return `py-4 transition-colors border-[1px] flex justify-center ${roundedClass} ${
      isSelected
        ? "bg-gray-800 text-primary-500 border-primary-500"
        : "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-100 border-[1px]"
    }`;
  };

  return (
    <div
      className={`grid bg-gray-700 rounded-md overflow-hidden ${
        props.selectableData.length === 2 ? "grid-cols-2" : "grid-cols-2"
      } bg-gray-800`}
    >
      {props.selectableData.map((item, index) => (
        <button key={item.value} onClick={() => onSelect(item)} className={getButtonStyle(index)}>
          {item.label}
        </button>
      ))}
      {props.isResetButton && (
        <button
          onClick={onClickResetButton}
          className="col-span-2 py-4 flex justify-center bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-300 "
        >
          초기화
        </button>
      )}
    </div>
  );
};

export default SpartaSelectableGroup;
