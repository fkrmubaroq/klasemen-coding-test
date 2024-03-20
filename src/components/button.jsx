import cn from "classnames";
export default function Button({ className,children, ...props }) {
  return (
    <button
      {...props}
      className={cn("p-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700", className)}
    >{children}</button>
  );
}
