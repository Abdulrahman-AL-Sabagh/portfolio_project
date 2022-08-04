/** @format */

import PostEntity from "./pages/api/entities/post/Post";
import UserEntity from "./pages/api/entities/User";
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
