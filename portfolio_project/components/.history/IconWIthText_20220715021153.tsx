import React,{ FC } from "react";
import { Flex,Button,Text,Center } from "@chakra-ui/react";

const IconWithText:FC<{

    changeIconSettings?: Function;
    iconName: string;
    color?: string;
    weight: IconWeight;

}>=()=>{

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