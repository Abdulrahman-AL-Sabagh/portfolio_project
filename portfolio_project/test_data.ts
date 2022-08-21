/** @format */

import { List, User } from "@prisma/client";

import { v4 } from "uuid";

export const objectNotFound = {
  data: null,
  message: undefined,
  error: undefined,
};

export const userData: { data: User } = {
  data: {
    name: "Abudi",
    password: "12345678",
    email: "test400@user.com",
    aboutUser: null,
    id: v4(),
    avatar: null,
    birthday: null,
    gender: "M",
    job: null,
    location: null,
    profileBackground: null,
    status: null,
  },
};

export const postData = {
  data: {
    id: v4(),
    description: "hello World",
    image: "https://example.com",
    publishedAt: new Date(),
    title: "A title",
    userId: userData.data.id,
  },
};

export const listData: List = {
  id: v4(),
  title: "Superlist",
  color: "Magenta",
  titleColor: "black",
  userId: userData.data.id,
};
