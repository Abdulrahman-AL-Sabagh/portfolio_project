/** @format */

import { Avatar, Container, Flex, Input } from "@chakra-ui/react";
import { Bell, MagnifyingGlass, SignOut } from "phosphor-react";
import React, { FC, useState } from "react";
import COLORS from "../color";
import Link from "next/link";
import RoundedIcon from "./RoundedIcon";
import {
  DEFAULT_ICONS_SETTINGS,
  ACTIVATED_ICONS_SETTINGS,
  NavIcons,
} from "../icons";
const Nav: FC = () => {
  const [iconChanges, setIconChanges] = useState({
    notification: DEFAULT_ICONS_SETTINGS.notification,
    logout: DEFAULT_ICONS_SETTINGS.logout,
  });

  const changeIconSettings = (name: NavIcons) => {
    setIconChanges((prevState) => ({
      ...prevState,
      [name]:
        iconChanges[name] === DEFAULT_ICONS_SETTINGS[name]
          ? ACTIVATED_ICONS_SETTINGS[name]
          : DEFAULT_ICONS_SETTINGS[name],
    }));
    console.log(iconChanges);
  };

  return (
    <Flex
      alignItems={"center"}
      gap={10}
      padding={20}
      height={"fit-content"}
      maxHeight={80}
      background={COLORS.primary}
      width={"full"}
    >
      <Container display={"inline"} width={"100"}>
        Logo Box
      </Container>

      <Flex
        alignItems={"center"}
        flex={2}
        width={"full"}
        justifyContent={"space-between"}
      >
        <Container color={"white"}>App name</Container>
        <Flex alignItems={"center"}>
          <Input
            type={"text"}
            background={COLORS.background}
            color={COLORS.placeholder}
            borderRadius={30}
            width={600}
            placeholder={"Search for Posts or Friends"}
            height={50}
            outline={"none"}
            borderWidth={0}
          />
          <Container
            width={"fit-content"}
            height={"fit-content"}
            marginLeft={-50}
          >
            <MagnifyingGlass color={COLORS.placeholder} size={24} />
          </Container>
        </Flex>

        <Flex gap={20} justifyContent={"space-between"} alignItems={"center"}>
          <RoundedIcon
            iconName="notification"
            handleClick={() => changeIconSettings("notification")}
            icon={Bell}
            color={iconChanges.notification.color}
            weight={iconChanges.notification.weight}
          />

          <Link href={"http://localhost:3000/signin"} passHref>
            <RoundedIcon
              iconName="logout"
              color={iconChanges.logout.color}
              handleClick={() => changeIconSettings("logout")}
              icon={SignOut}
              weight={iconChanges.logout.weight}
            />
          </Link>
          <Link href={"http://localhost:3000/home"} passHref>
            <Avatar width={48} color={COLORS.placeholder} height={48} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Nav;
//TODO Make notification with accordion
