const Easy = ({ gap, bg }: { gap: number; bg?: boolean }) => {
  return (
    <div
      className={`flex items-center gap-[${gap}px] p-[${gap}px] ${
        bg ? "bg-primary-800" : "bg-gray-600"
      } font-bold  rounded-lg`}
    >
      🎲 EASY
    </div>
  );
};

export default Easy;
