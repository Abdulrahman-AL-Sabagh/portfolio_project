/** @format */

import { Button, Center, Icon, IconButton } from "@chakra-ui/react";
import { IconProps } from "phosphor-react";
import React, { FC, ReactElement } from "react";
import COLORS from "../color";

const RoundedIcon: FC<{
  icon:
    React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >
  >;
  changeIconSettings?: Function;
  iconName: string
}> = ({ icon, changeIconSettings }) => {
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
        {icon}
      </Center>
    </Button>
  );
};

export default RoundedIcon;
