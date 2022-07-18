/** @format */

import { Button } from "@chakra-ui/react";
import React, { FC, ReactFragment, ReactNode } from "react";

const MyButton: FC<{
  children: ReactFragment | ReactNode;
  handleClick: Function;
  background: string;
}> = ({ children, handleClick, background }) => {
  const textColor =
    parseInt(background.replace("#", ""), 16) < 0xffffff / 1.1
      ? "white"
      : "black";
  return (
    <Button
      padding={15}
      fontSize={24}
      background={background}
      color={textColor}
      outline="none"
      borderWidth={0}
      borderRadius={10}
      width={"fit-content"}
      onClick={() => handleClick()}
    >
      {children}
    </Button>
  );
};
export default MyButton;
