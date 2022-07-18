/** @format */

import {
  ComponentMeta,
  ComponentStory,
} from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import React from "react";
import Nav from "../components/Nav";

export default {
  title: "Example/Nav",
  component: Nav,
} as ComponentMeta<typeof Nav>;

export const primary = () => <Nav />;
