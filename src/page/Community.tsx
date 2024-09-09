import CardList from "../components/communityComponents/CardList";
import Navigation from "../components/communityComponents/Navigation";
import SearchFilter from "../components/communityComponents/SearchFilter";

const Community = () => {
  return (
    <main className="min-h-full">
      <CardList />
      <Navigation />
      <SearchFilter />
    </main>
  );
};

export default Community;
