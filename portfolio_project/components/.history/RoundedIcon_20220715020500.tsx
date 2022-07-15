/** @format */

import { Button, Center, color, Icon, IconButton } from "@chakra-ui/react";
import { IconProps } from "phosphor-react";
import React, { FC, ReactElement } from "react";
import COLORS from "../color";

const RoundedIcon: FC<{
  icon:
    React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >
  
  changeIconSettings?: Function;
  iconName: string
  color?: string
}> = ({ icon, changeIconSettings,color }) => {

  const Icon = icon;
  return (
    <Button
    
      onClick={()=>changeIconSettings}
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
     <Icon size={48} color={color === undefined ? "white" : color} weight="fill"></Icon> 
      </Center>
    </Button>
  );
};

export default RoundedIcon;
