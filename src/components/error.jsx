import cn from "classnames";
export default function Error({ children, className, onHide, show }) {
  if (!show) return <></>;
  return (
    <div
      className={cn(
        "bg-red-600 px-8 py-4 rounded-md text-white relative",
        className
      )}
    >
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => onHide()}
      >
        x
      </div>
      {children}
    </div>
  );
}
