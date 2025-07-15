import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGameCategory } from "../../api/game";
import { TCategoryListResponse } from "../../types";

type props = {
  onClickModalToggleHandler: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
};

const CategoryModal = ({ modalRef, onClickModalToggleHandler }: props) => {
  const { data } = useQuery<TCategoryListResponse>({
    queryKey: ["gameCategory"],
    queryFn: getGameCategory,
  });

  const categoryList = data?.data ?? [];

  return (
    <div
      ref={modalRef}
      onClick={onClickModalToggleHandler}
      className="absolute top-10  flex gap-5 py-5 px-2 bg-gray-800 border border-solid border-primary-500 rounded-[20px] "
    >
      <div className="flex items-center gap-3 flex-wrap w-[200px]">
        {categoryList &&
          categoryList.map((item, idx) => (
            <Link key={idx} to={`/category?category=${item.name}`}>
              <p className="hover:text-primary-500 w-[94px] text-center">{item.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryModal;
