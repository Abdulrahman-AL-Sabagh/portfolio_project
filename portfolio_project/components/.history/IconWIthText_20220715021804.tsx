/** @format */

import React, { FC } from "react";
import { Flex, Button, Text, Center } from "@chakra-ui/react";
import { IconProps, IconWeight } from "phosphor-react";

const IconWithText: FC<{
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  changeIconSettings?: Function;
  iconName: string;
  color?: string;
  weight: IconWeight;
}> = ({ icon, changeIconSettings, iconName, color, weight }) => {
  
  
  const Icon =icon;
    return (  
    <Button>
      <Center>
        <Flex>
            <Icon color={color === undefined ? }/>
          <Text></Text>
        </Flex>
      </Center>
    </Button>
  );
};

//TODO add all of the items to the enum

export default IconWithText;
