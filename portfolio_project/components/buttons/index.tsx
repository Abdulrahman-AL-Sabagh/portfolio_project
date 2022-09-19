/** @format */

import { FC, ButtonHTMLAttributes } from "react";
export type ButtonType = FC<{ children: any } & ButtonHTMLAttributes<any>>;

const defaultButtonStyle = `flex justify-center items-center
disabled:bg-gray-400 disabled:text-black rounded
 transition-all hover:opacity-70 p-4 bg`;

const Button: ButtonType = ({ className = "", children, ...rest }) => {
  return (
    <button {...rest} className={`${defaultButtonStyle} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
