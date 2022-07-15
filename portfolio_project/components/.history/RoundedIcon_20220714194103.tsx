/** @format */

import { Center } from "@chakra-ui/react";
import React, { FC, ReactElement } from "react";
import { IconType } from "react-icons/lib";
import COLORS from "../color";

const RoundedIcon: FC<{ icon: ReactElement<IconType> }> = ({ icon }) => {
  return <Center background={COLORS.} rounded={"full"}>{icon}</Center>;
};

export default RoundedIcon;
