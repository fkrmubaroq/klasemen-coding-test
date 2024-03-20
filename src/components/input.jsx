import cn from "classnames";
export default function Input({ value, invalid, className, ...props }) {
  return (
    <>
      <input
        {...props}
        className={cn(
          "p-2.5 rounded-md border border-gray-300 form-input",
          className
        )}
        value={value}
      />
      {invalid && (
        <span className="feedback-error text-red-700">{invalid}</span>
      )}
    </>
  );
}