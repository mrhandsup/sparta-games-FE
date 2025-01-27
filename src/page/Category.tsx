import { useSearchParams } from "react-router-dom";

import Title from "../components/categoryComponents/Title";
import GameCardList from "../components/HomeComponents/GameCardList";
import { useQuery } from "@tanstack/react-query";
import { getGameListByCategory } from "../api/game";

const Category = () => {
  //* Hooks
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // data
  const { data } = useQuery<any>({
    queryKey: ["gameListCategory", category],
    queryFn: () => getGameListByCategory(category!),
    enabled: !!category,
  });

  return (
    <main className="w-full">
      <Title category={searchParams.get("category")!} />
      <div className="">
        <GameCardList data={data?.results} />
      </div>
    </main>
  );
};

export default Category;
