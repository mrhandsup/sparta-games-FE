const Top = () => {
  return (
    <section className="relative flex flex-col items-center gap-5 py-[60px] h-[440px] bg-[#FFF2F2]">
      <div>
        <span className="text-heading-40">User/Player의 Threads</span>
        <span className="absolute top-[60px] right-16 flex justify-center items-center w-[260px] h-12 rounded-lg bg-primary-500 text-title-18 text-primary-950">
          글쓰기
        </span>
      </div>
      <div className="relative flex">
        <img src="" alt="Thumbnail" className="w-[279px] h-[245px] bg-gray-50" />
        <div className="absolute">category</div>
        <div className="flex flex-col gap-[6px] p-3 w-[279px] h-[245px]">
          <div className="flex justify-between">
            <span className="text-heading-20">게임명</span>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <div>제작자</div>
          <div className="flex gap-2">
            <span className="flex items-center px-1 h-6 bg-[#FBCCFF] text-body-14">chip 1 🎮</span>
            <span className="flex items-center px-1 h-6 bg-[#FFFDCC] text-body-14">chip 2 🎮</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Top;
