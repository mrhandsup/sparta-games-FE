type props = {

  onClickModalToggleHandler: () => void;
};

const AlarmModal = ({  onClickModalToggleHandler }: props) => {
  return (
    <div
  
      onClick={onClickModalToggleHandler}
      className="absolute top-10 right-0 flex gap-5 py-5 px-2 w-[360px] h-[712px] bg-gray-800 border border-solid border-primary-500 shadow-primary rounded-[20px] "
    >
      <div className="flex items-center gap-3 flex-wrap w-[200px]"></div>
    </div>
  );
};

export default AlarmModal;
