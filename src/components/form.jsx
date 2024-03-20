import cn from "classnames";
import React from "react";
const Form = React.forwardRef(({ children, onSubmit, className, validated }, ref) => {
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn("form", className, { validated   })}
      ref={ref}
    >
      {children}
    </form>
  );
})

Form.displayName = "Form";
export default Form;