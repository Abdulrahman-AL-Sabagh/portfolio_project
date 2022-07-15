/** @format */

import { Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";
import COLORS from "../color";

const RoundedIcon: FC<{ icon: IconType }> = ({ icon }) => {
  const Icon = icon;
  return (
    <Center
      width={80}
      height={80}
      background={COLORS.secondary}
      borderRadius={"full"}
    >
      <Icon fill={"white"} size={48} />
    </Center>
  );
};

export default RoundedIcon;
