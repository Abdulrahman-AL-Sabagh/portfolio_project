/** @format */

import React, { FC } from "react";
import { Flex, Button, Text, Center } from "@chakra-ui/react";
import { myIconProps } from "../icons";

const IconWithText: FC<myIconProps> = ({
  icon,
  handleClick,
  iconName,
  color,
  weight,
  text,
}) => {
  const Icon = icon;
  return (
    <Button
      background={"transparent"}
      color={"inherit"}
      outline="none"
      borderWidth={0}
      onClick={() => handleClick()}
    >
      <Center>
        <Flex
          direction={"column"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Icon size={48} weight={weight} color={color} />
          <Text color={color}>
            {text} {iconName}
          </Text>
        </Flex>
      </Center>
    </Button>
  );
};

//TODO add all of the items to the enum

export default IconWithText;
