import cn from "classnames";
export default function Error({ children, className }) {
  return (
    <div className={cn("bg-red-600 p-4 rounded-md text-white", className)}>
      {children}
    </div>
  );
}