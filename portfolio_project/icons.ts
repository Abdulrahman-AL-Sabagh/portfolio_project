/** @format */

import { IconProps, IconWeight } from "phosphor-react";
import COLORS from "./color";

type icons = {
  postIcons: {
    like: "like";
    comment: "comment";
    bookmark: "bookmark";
    share: "share";
    moreDetails: "moreDetails";
  };
  navIcon: {
    logout: "logout";
    notification: "notification";
  };
  sideBarIcon: {
    home: "home";
    settings: "settings";
    chat: "chat";
    calender: "calender";
    friends: "friends";
  };
};

export type PostIcons = keyof icons["postIcons"];
export type NavIcons = keyof icons["navIcon"];
export type SidebarIcons = keyof icons["sideBarIcon"];
export type IconSettingsValuesTypes = { color: string; weight: IconWeight };
const defaultValue: IconSettingsValuesTypes = {
  color: COLORS.placeholder,
  weight: "light",
};

const defaultActiveValue: IconSettingsValuesTypes = {
  color: "#FFFFFF",
  weight: "fill",
};

export const DEFAULT_ICONS_SETTINGS: {
  [K in PostIcons | NavIcons | SidebarIcons]: IconSettingsValuesTypes;
} = {
  like: defaultValue,
  comment: defaultValue,
  bookmark: defaultValue,
  share: defaultValue,
  logout: defaultValue,
  notification: defaultValue,
  calender: defaultValue,
  chat: defaultValue,
  home: defaultValue,
  friends: defaultValue,
  settings: defaultValue,
  moreDetails: defaultValue,
};
export const ACTIVATED_ICONS_SETTINGS: {
  [K in PostIcons | NavIcons | SidebarIcons]: IconSettingsValuesTypes;
} = {
  like: defaultActiveValue,
  comment: defaultActiveValue,
  bookmark: { color: COLORS.warning, weight: "fill" },
  share: { color: "white", weight: "bold" },
  logout: { color: COLORS.error, weight: "bold" },
  notification: { color: COLORS.warning, weight: defaultActiveValue.weight },
  calender: defaultActiveValue,
  chat: defaultActiveValue,
  friends: defaultActiveValue,
  home: defaultActiveValue,
  settings: { color: "gray", weight: "fill" },
  moreDetails: defaultActiveValue,
};

export type myIconProps = {
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  weight: IconWeight;
  iconName: NavIcons | PostIcons | SidebarIcons;
  color: string;
  text?: string;
  handleClick: Function;
};
