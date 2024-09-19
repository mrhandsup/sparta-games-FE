const Hard = ({ gap, bg }: { gap: number; bg?: boolean }) => {
  return (
    <div
      className={`flex items-center gap-[${gap}px] p-[${gap}px] h-12 ${
        bg ? "bg-primary-800" : "bg-gray-600"
      }  rounded-lg`}
    >
      🎮 HARD
    </div>
  );
};

export default Hard;
