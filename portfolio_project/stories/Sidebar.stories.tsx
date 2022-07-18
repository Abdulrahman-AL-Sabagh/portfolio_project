/** @format */

import { ComponentMeta } from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import React from "react";
import Sidebar from "../components/Sidebar";

export default {
  title: "Example/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

export const primary = () => <Sidebar />;
