import Card from "./Card";

import pixelFire from "../../assets/communityImage/pixelFire.svg";

const CardList = () => {
  return (
    <>
      <h3 className="flex gap-3 py-5 px-[130px]">
        <img src={pixelFire} />
        <p className="font-DungGeunMo text-heading-32 text-white">지금 가장 인기있는 게시글</p>
      </h3>
      <div className="flex gap-5 w-[1180px] mx-auto">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default CardList;
