/** @format */

import React, { FC, ReactElement, ReactNode } from "react";
import Button from "components/buttons/index";
import BlockButton from "components/buttons/block/index";
const Examples = () => {
  return (
    <div className="flex flex-col justify-center my-20 gap-2 p-20 items-center h-full form-group">
      <Button
        onClick={() => console.log("hi")}
        className="w-32 h-12 border-8 border-black bg-purple-600"
        disabled={false}
      >
        <p className="text-white text-base">Hello World</p>
      </Button>
      <Button className="w-32" disabled={true}>
        <p>Hello World</p>
      </Button>
      <BlockButton className=" bg-red-400">Hello World</BlockButton>
      <Input className="border-b-2  " placeholder="Some Text" type={"text"} />
    </div>
  );
};
export default Examples;

/** @format */

const Input: FC<React.InputHTMLAttributes<any>> = ({ className, ...rest }) => {
  return (
    <input
      className={
        className +
        "bg-transparent border-solid border-gray-300  focus:border-blue-500 transition-all "
      }
      {...rest}
    />
  );
};

const WithLabel = (Component: FC) => {
  return (({ children, className }) => {
    <div>
      <label className={className}>{children}</label>
      <Component />
    </div>;
  }) as FC<{ children: any; className: string }>;
};
