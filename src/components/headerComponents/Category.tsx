type props = {
  onClickModalToggleHandler: () => void;
};

const Category = ({ onClickModalToggleHandler }: props) => {
  return (
    <div
      onClick={onClickModalToggleHandler}
      className="absolute top-14 flex gap-5 py-5 px-10 bg-gray-800 border border-solid border-primary-500 rounded-[20px]"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="hover:text-primary-500">Action</p>
        <p className="hover:text-primary-500">Arcade</p>
        <p className="hover:text-primary-500">FPS</p>
        <p className="hover:text-primary-500">Platform</p>
        <p className="hover:text-primary-500">Rhythm</p>
        <p className="hover:text-primary-500">Survival</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="hover:text-primary-500">Adventure</p>
        <p className="hover:text-primary-500">Casual</p>
        <p className="hover:text-primary-500">Horror</p>
        <p className="hover:text-primary-500">Puzzle</p>
        <p className="hover:text-primary-500">RPG</p>
        <p className="hover:text-primary-500">Test</p>
      </div>
    </div>
  );
};

export default Category;
