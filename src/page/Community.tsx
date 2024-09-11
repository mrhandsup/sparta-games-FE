import CardList from "../components/communityComponents/CardList";
import CommunityList from "../components/communityComponents/CommunityList";
import Navigation from "../components/communityComponents/Navigation";
import SearchFilter from "../components/communityComponents/SearchFilter";

const Community = () => {
  return (
    <main className="min-h-full">
      <CardList />
      <Navigation />
      <SearchFilter />
      <CommunityList />
    </main>
  );
};

export default Community;
