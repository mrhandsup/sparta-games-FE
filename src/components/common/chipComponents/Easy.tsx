const Easy = ({ gap, bg }: { gap: number; bg?: boolean }) => {
  return (
    <div
      className={`flex items-center gap-[${gap}px] p-[${gap}px] ${
        bg ? "bg-gray-100" : "bg-white"
      } font-bold  rounded-lg`}
    >
      🎲 EASY
    </div>
  );
};

export default Easy;
