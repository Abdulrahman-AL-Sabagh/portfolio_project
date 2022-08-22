/** @format */

import { Status, Gender } from "@prisma/client";

/** @format */

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  gender?: Gender;
  job?: string;
  birthday?: Date;
  status: Status;
  aboutUser?: string;
  location?: string;
  profileBackground: string;
}
export interface IPost {
  id: string;
  publishedAt: Date;
  title: string;
  description: string;
  image?: string;
  userId: string;
}
export interface IList {
  id: string;
  title: string;
  titleColor?: string;
  userId: string;
  color?: string;
}
export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadLine?: Date;
  titleColor?: string;
  listId: string;
}
export interface IComment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  publishedAt: Date;
}
export interface ILike {
  userId: string;
  postId: string;
}
export interface IBookmark {
  userId: string;
  postId: string;
}
