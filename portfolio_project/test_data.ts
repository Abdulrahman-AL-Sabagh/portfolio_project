/** @format */

import PostEntity from "@entities/post/Post";
import ListEntity from "@entities/todolist/List";
import { List, User } from "@prisma/client";

import { v4 } from "uuid";
export const userData: User = {
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
};

export const postData = {
  id: v4(),
  description: "hello World",
  image: "https://example.com",
  publishedAt: new Date(),
  title: "A title",
  userId: userData.id,
};

export const listData: List = {
  id: v4(),
  title: "Superlist",
  color: "Magenta",
  titleColor: "black",
  userId: userData.id,
};
