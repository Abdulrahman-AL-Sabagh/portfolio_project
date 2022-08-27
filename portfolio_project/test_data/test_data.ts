/** @format */

import { List, Task, User } from "@prisma/client";

import { v4 } from "uuid";

export const objectNotFound = {
  data: null,
  message: undefined,
  error: undefined,
};

export const userData: User = {
  name: "Abudi",
  password: "12345678",
  email: "test400@user.com",
  aboutUser: null,
  id: "10ca4e2d-0482-4fab-b984-84721dec6028",
  avatar: null,
  birthday: null,
  gender: "M",
  job: null,
  location: null,
  profileBackground: null,
  status: null,
};

export const postData = {
  id: "7c9a1277-29bf-4dbf-86ae-5a5837abd091",
  description: "hello World",
  image: "https://example.com",
  publishedAt: new Date(),
  title: "A title",
  userId: userData.id,
};

export const listData: List = {
  id: "9575b5f1-e24b-4f6d-a439-c099869fc8ce",
  title: "Superlist",
  color: "Magenta",
  titleColor: "black",
  userId: userData.id,
};

export const commentData = {
  id: "7bdee966-dfa1-4735-8018-70ad52a74c3b",
  userId: userData.id,
  postId: postData.id,
  content: "Hello",
  publishedAt: new Date(),
};

export const taskData: Task = {
  id: "40f7cf38-97b6-4667-ba34-2bf5f342e472",
  deadLine: null,
  description: "hello",
  title: "Hello",
  titleColor: "red",
  listId: listData.id,
};
