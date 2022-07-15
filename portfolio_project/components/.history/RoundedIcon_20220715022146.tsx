/** @format */

import { Button, Center } from "@chakra-ui/react";
import { IconProps, IconWeight } from "phosphor-react";
import React, { FC } from "react";
import COLORS from "../color";

const RoundedIcon: FC<{
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;

  changeIconSettings?: Function;
  iconName: string;
  color?: string;
  weight: IconWeight;
}> = ({ icon, changeIconSettings, color, weight,iconName }) => {
  const Icon = icon;
  return (
    <Button
      onClick={() => changeIconSettings(iconName)}
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
          color={color === undefined ? COLORS.placeholder : color}
          weight={weight}
        ></Icon>
      </Center>
    </Button>
  );
};

export default RoundedIcon;
