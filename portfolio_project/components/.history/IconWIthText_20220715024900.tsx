/** @format */

import React, { FC } from "react";
import { Flex, Button, Text, Center } from "@chakra-ui/react";
import { IconProps, IconWeight } from "phosphor-react";
import COLORS from "../color";

const IconWithText: FC<{
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  changeIconSettings?: Function;
  iconName: string;
  color?: string;
  weight: IconWeight;
  text?: string;
}> = ({ icon, changeIconSettings, iconName, color, weight, text }) => {
  const Icon = icon;
  return (
    <Button
    background={""}
      onClick={() =>
        changeIconSettings !== undefined && changeIconSettings(iconName)
      }
    >
      <Center>
        <Flex>
          <Icon
            size={48}
            weight={weight}
            color={color === undefined ? COLORS.placeholder : color}
          />
          <Text>
            {text} {iconName}
          </Text>
        </Flex>
      </Center>
    </Button>
  );
};

//TODO add all of the items to the enum

export default IconWithText;
