/** @format */

import { Flex } from "@chakra-ui/react";
import { Calendar, Chats, Faders, House, Users } from "phosphor-react";
import React, { useState } from "react";
import COLORS from "../color";
import {
  SidebarIcons,
  DEFAULT_ICONS_SETTINGS,
  myIconProps,
  ACTIVATED_ICONS_SETTINGS,
  IconSettingsValuesTypes,
} from "../icons";
import IconWithText from "./IconWithText";
import RoundedIcon from "./RoundedIcon";

type icons = { [K in SidebarIcons]: IconSettingsValuesTypes };
const Sidebar = () => {
  const [iconChanges, setIconChanges] = useState<icons>({
    home: DEFAULT_ICONS_SETTINGS.home,
    calender: DEFAULT_ICONS_SETTINGS.calender,
    chat: DEFAULT_ICONS_SETTINGS.chat,
    friends: DEFAULT_ICONS_SETTINGS.friends,
    settings: DEFAULT_ICONS_SETTINGS.friends,
  });
  const changeIconSettings = (name: SidebarIcons) =>
    setIconChanges((prevState) => ({
      ...prevState,
      [name]:
        iconChanges[name] === DEFAULT_ICONS_SETTINGS[name]
          ? ACTIVATED_ICONS_SETTINGS[name]
          : DEFAULT_ICONS_SETTINGS[name],
    }));

  const sidebarIcons: myIconProps[] = [
    {
      icon: House,
      iconName: "home",
      handleClick: () => changeIconSettings("home"),
      color: iconChanges.home.color,
      weight: iconChanges.home.weight,
    },
    {
      icon: Chats,
      iconName: "chat",
      handleClick: () => changeIconSettings("chat"),
      color: iconChanges.chat.color,
      weight: iconChanges.chat.weight,
    },
    {
      icon: Calendar,
      iconName: "calender",
      handleClick: () => changeIconSettings("calender"),
      color: iconChanges.calender.color,
      weight: iconChanges.calender.weight,
    },
    {
      icon: Users,
      iconName: "friends",
      handleClick: () => changeIconSettings("friends"),
      color: iconChanges.friends.color,
      weight: iconChanges.friends.weight,
    },
    {
      icon: Faders,
      iconName: "settings",
      handleClick: () => changeIconSettings("settings"),
      color: iconChanges.settings.color,
      weight: iconChanges.settings.weight,
    },
  ];

  return (
    <Flex
      background={COLORS.primary}
      gap="50"
      direction="column"
      width={100}
      height="full"
      justifyContent={"center"}
      alignItems={"center"}
    >
      {sidebarIcons.map((sidebarIcon) => (
        <IconWithText key={sidebarIcon.iconName} {...sidebarIcon} />
      ))}
    </Flex>
  );
};

export default Sidebar;
