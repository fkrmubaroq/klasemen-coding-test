import cn from "classnames";
import { useState } from "react";
export default function Error({ children, className }) {
  const [show, setShow] = useState(true);
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
          onClick={() => setShow(false)}
        >
          x
        </div>
        {children}
      </div>
    );
}