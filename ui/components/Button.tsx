import React from "react";

export interface ButtonProps {
  handler: VoidFunction;
  className?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
}
const Button = ({ handler, className, children, isDisabled }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled !== undefined ? isDisabled : false}
      className={
        className +
        " p-2 text-center rounded-md hover:scale-100 transition-all  "
      }
      onClick={() => handler()}
    >
      {children}
    </button>
  );
};
export default Button;
