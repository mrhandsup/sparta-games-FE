import { Link } from "react-router-dom";

type props = {
  onClickModalToggleHandler: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
};

const Category = ({ modalRef, onClickModalToggleHandler }: props) => {
  return (
    <div
      ref={modalRef}
      onClick={onClickModalToggleHandler}
      className="absolute top-14 flex gap-5 py-5 px-10 bg-gray-800 border border-solid border-primary-500 rounded-[20px]"
    >
      <div className="flex flex-col items-center gap-4">
        <Link to={""}>
          <p className="hover:text-primary-500">Action</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Arcade</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">FPS</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Platform</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Rhythm</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Survival</p>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link to={""}>
          <p className="hover:text-primary-500">Adventure</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Casual</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Horror</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Puzzle</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">RPG</p>
        </Link>
        <Link to={""}>
          <p className="hover:text-primary-500">Test</p>
        </Link>
      </div>
    </div>
  );
};

export default Category;
