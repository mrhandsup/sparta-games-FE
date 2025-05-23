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
      className="absolute top-14 flex gap-5 py-5 px-8 bg-gray-800 border border-solid border-primary-500 rounded-[20px] "
    >
      <div className="flex items-center gap-5 flex-wrap w-[250px]">
        {categoryList &&
          categoryList.map((item, idx) => (
            <Link key={idx} to={`/category?category=${item.name}`}>
              <p className="hover:text-primary-500 w-[110px] text-center">{item.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryModal;
