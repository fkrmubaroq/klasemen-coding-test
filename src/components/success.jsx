import cn from "classnames";
export default function Success({ children, className }) {
  return (
    <div className={cn("bg-green-600 p-4 rounded-md text-white", className)}>
      {children}
    </div>
  );
}
