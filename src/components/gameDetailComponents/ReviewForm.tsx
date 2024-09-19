import star from "../../assets/gameDetail/star.svg";
import ellipse from "../../assets/ellipse.svg";

const ReviewForm = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="w-20 h-20 bg-white rounded-lg"></div>
      <div className="flex flex-col gap-3 w-full">
        <textarea
          maxLength={300}
          placeholder="별점과 난이도를 선택한 후, 리뷰를 입력해주세요"
          className="p-5 w-full h-28 rounded-lg bg-gray-700 border border-solid border-white resize-none text-white text-[20px] font-medium"
        />
        <div className="flex gap-[15px] h-12">
          <div className="flex gap-3">
            <div className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg">
              <img src={star} />
            </div>
            <div className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg">
              <img src={star} />
              <img src={star} />
            </div>
            <div className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg">
              <img src={star} />
              <img src={star} />
              <img src={star} />
            </div>
            <div className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg">
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
            </div>
            <div className="flex gap-1 p-3 w-fit bg-gray-600 rounded-lg">
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
              <img src={star} />
            </div>
          </div>
          <img src={ellipse} />
          <div className="flex items-center gap-[15px] text-[26.4px] font-bold text-white">
            <div className="flex items-center p-[8px] h-12 bg-gray-600 rounded-lg">🎲 EASY</div>
            <div className="flex items-center p-[8px] h-12 bg-gray-600 rounded-lg">🎮 HARD</div>
          </div>
          <img src={ellipse} />
          <button className="w-40 h-12 bg-primary-500 text-title-18 rounded-lg">리뷰입력</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
