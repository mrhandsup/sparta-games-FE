import { useSearchParams } from "react-router-dom";

import Title from "../components/categoryComponents/Title";
import GameCardList from "../components/homeComponents/GameCardList";
import { useQuery } from "@tanstack/react-query";
import { getGameListByCategory } from "../api/game";
import { useState } from "react";
import SpartaPagination from "../spartaDesignSystem/SpartaPagination";

const Category = () => {
  //* Hooks
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [page, setPage] = useState<number>(1);

  // data
  const { data } = useQuery<any>({
    queryKey: ["gameListCategory", category, page],
    queryFn: () => getGameListByCategory(category!, page),
    enabled: !!category,
  });

  const totalCount = data?.count || 0;

  return (
    <main className="w-full">
      <Title category={searchParams.get("category")!} />
      <div className="h-fit pb-10">
        <GameCardList data={data?.data} />
        <SpartaPagination dataTotalCount={totalCount} countPerPage={16} onChangePage={(e, page) => setPage(page)} />
      </div>
    </main>
  );
};

export default Category;
