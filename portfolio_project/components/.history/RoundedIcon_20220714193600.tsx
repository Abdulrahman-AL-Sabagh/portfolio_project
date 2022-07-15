/** @format */

import { Center } from "@chakra-ui/react";
import React, { FC, ReactElement } from "react";
import { IconType } from "react-icons/lib";

const RoundedIcon: FC<{ icon: ReactElement<IconType> }> = ({ icon }) => {
  return <Center>{icon}</Center>;
};

export default RoundedIcon;
