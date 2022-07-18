/** @format */

import { ComponentMeta } from "@storybook/react/dist/ts3.9/client/preview/types-6-3";
import React from "react";
import PostGenerator from "../components/PostGenerator";

export default {
  title: "Example/PostGenerator",
  component: PostGenerator,
} as ComponentMeta<typeof PostGenerator>;

export const primary = () => <PostGenerator />;
