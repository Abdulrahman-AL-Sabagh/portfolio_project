import React,{ FC } from "react";
import { Flex,Button,Text,Center } from "@chakra-ui/react";
import { IconWeight } from "phosphor-react";

const IconWithText:FC<{
    icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
    changeIconSettings?: Function;
    iconName: string;
    color?: string;
    weight: IconWeight;

}>=()=>{
    const 
    return (
        <Button>
<Center>

    <Flex>
        
    </Flex>
</Center>
        </Button>
        
    )

}

export default IconWithText