type Props = {
  img?: string;
  title: string;
};

export default function CommunityProjectTitle({ img, title }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <img src={img} />
      <p className="font-DungGeunMo text-[24px] text-white">{title}</p>
    </div>
  );
}
