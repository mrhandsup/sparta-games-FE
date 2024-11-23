import { Link } from "react-router-dom";

import { CATEGORY } from "../../constant";

type props = {
  onClickModalToggleHandler: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
};

const CategoryModal = ({ modalRef, onClickModalToggleHandler }: props) => {
  return (
    <div
      ref={modalRef}
      onClick={onClickModalToggleHandler}
      className="absolute top-14 flex gap-5 py-5 px-10 bg-gray-800 border border-solid border-primary-500 rounded-[20px]"
    >
      <div className="flex flex-col items-center gap-4">
        {CATEGORY.slice(0, 6).map((item, idx) => (
          <Link key={idx} to={`/category?category=${item}`}>
            <p className="hover:text-primary-500">{item}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4">
        {CATEGORY.slice(6).map((item, idx) => (
          <Link key={idx} to={`/category?category=${item}`}>
            <p className="hover:text-primary-500">{item}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryModal;
