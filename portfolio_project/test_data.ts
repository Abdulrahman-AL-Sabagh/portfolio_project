/** @format */

import PostEntity from "@entities/post/Post";
import ListEntity from "@entities/todolist/List";
import UserEntity from "@entities/User";
import { v4 } from "uuid";
export const userToAdd = new UserEntity({
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
});

export const postToAdd = new PostEntity({
  id: v4(),
  description: "hello World",
  image: "https://example.com",
  publishedAt: new Date(),
  title: "A title",
  userId: userToAdd.id,
});


export const listToAdd = new ListEntity({
  id: v4(),
  title: "Superlist",
  color: "Magenta",
  titleColor: "black",
  userId: userToAdd.id,
});