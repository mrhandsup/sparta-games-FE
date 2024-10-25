const Easy = ({ bg }: { bg?: boolean }) => {
  return (
    <div
      className={`flex items-center px-1.5 py-1.5 ${
        bg ? "bg-primary-800" : "bg-gray-600"
      } font-bold rounded-md text-[11px]`}
    >
      🎲 EASY
    </div>
  );
};

export default Easy;
