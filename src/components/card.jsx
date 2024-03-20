import cn from "classnames";
export default function Card({ children, className }) {
  return <div className={cn("bg-white p-6", className)}>{children}</div>;
}