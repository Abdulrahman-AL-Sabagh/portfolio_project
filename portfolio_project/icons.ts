/** @format */

import { IconWeight } from "phosphor-react";
import COLORS from "./color";

type icons = {
  postIcons: {
    like: "like";
    comment: "comment";
    bookmark: "bookmark";
    share: "share";
  };
  navIcon: {
    logout: "logout";
  };
};

export type PostIcons = keyof icons["postIcons"];
export type navIcons = keyof icons["navIcon"];
const color = COLORS.placeholder;
const weight = "light";
export const ICONSDEFAULTSETTINGS: {
  [K in PostIcons | navIcons]: { color: string; weight?: IconWeight };
} = {
  like: { color, weight },
  comment: { color, weight },
  bookmark: { color, weight },
  share: { color, weight },
  logout: { color, weight },
};

export const ACTIVATEDICONSSETTINGS: {
  [K in PostIcons | navIcons]: { color: string; weight?: IconWeight };
} = {
  like: { color: "#FFFFFF", weight: "fill" },
  comment: { color: "#FFFFFF", weight: "fill" },
  bookmark: { color: COLORS.warning, weight: "fill" },
  share: {color: "white",weight: "bold"},
  logout: { color: COLORS.error },
};
