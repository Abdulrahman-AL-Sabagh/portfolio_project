import React from "react";

export interface ButtonProps {
  handler: VoidFunction;
  className: string;
  children: React.ReactNode;
}
const Button = ({ handler, className, children }: ButtonProps) => {
  return (
    <button className={className} onClick={() => handler()}>
      {children}
    </button>
  );
};
export default Button;
