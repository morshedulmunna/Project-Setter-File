type Props = {
  title: string;
  count?: number;
  className?: string;
};

export default function PageHeaderBox({ title, count, className }: Props) {
  return (
    <div
      className={`h-12 w-full rounded glass-gradient flex justify-start items-center px-4 ${
        className || ""
      }`}
    >
      <h4 className="text-white text-lg font-medium">
        {title} - {count}
      </h4>
    </div>
  );
}
