const Easy = ({ gap, bg }: { gap: number; bg?: boolean }) => {
  return (
    <div
      className={`flex gap-[${gap}px] items-center p-[${gap}px] ${
        bg ? "bg-primary-800" : "bg-gray-600"
      } font-bold  rounded-lg`}
    >
      🎲 EASY
    </div>
  );
};

export default Easy;
