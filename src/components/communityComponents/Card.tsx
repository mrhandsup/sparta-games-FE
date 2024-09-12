const Card = () => {
  return (
    <section>
      <div className="w-[280px] h-56 bg-gray-200">이미지 들어갈 곳</div>
      <div className="flex flex-col gap-2 p-4 bg-gray-800">
        <p className="text-title-14 text-primary-500">자유로운 이야기</p>
        <p className="w-[248px] text-heading-20 text-white whitespace-nowrap overflow-hidden text-ellipsis">
          제목 한 줄로만 나오게 작성 더 나갈경우 ...
        </p>
        <p className="w-[248px] text-body-14 text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
          제작자명 한줄로만 나오게 작성 벗어날경우 ...
        </p>
        <div className="flex justify-between text-[11px]">
          <div className="flex gap-[6px] text-white  font-bold">
            <p>👍100</p>
            <p>💭100</p>
          </div>
          <p className="text-gray-200">09.20.24 11:30PM</p>
        </div>
      </div>
    </section>
  );
};

export default Card;
