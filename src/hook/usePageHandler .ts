import { useState } from "react";

const usePageHandler = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return { currentPage, setCurrentPage, onChangePage };
};

export default usePageHandler;
