import CommunityCard from "./CommunityCard";

const CommunityList = () => {
  return (
    <>
      <div className="grid grid-cols-2 mt-14 mx-auto w-fit">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
      <div className="my-28">페이지 네이션</div>
    </>
  );
};

export default CommunityList;
