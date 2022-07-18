/** @format */

import { Button, Center } from "@chakra-ui/react";
import React, { FC } from "react";
import COLORS from "../color";
import { myIconProps } from "../icons";
const RoundedIcon: FC<myIconProps> = ({ icon, handleClick, color, weight }) => {
  const Icon = icon;
  return (
    <Button
      onClick={() => handleClick()}
      background={"transparent"}
      color="inherit"
      outline={"none"}
      borderWidth="0"
    >
      <Center
        borderRadius={"50%"}
        width={80}
        height={80}
        background={COLORS.secondary}
      >
        <Icon
          size={48}
          color={color}
          weight={weight}
        />
      </Center>
    </Button>
  );
};

export default RoundedIcon;
