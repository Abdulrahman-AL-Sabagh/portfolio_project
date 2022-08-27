/** @format */
import { v4 } from "uuid";
import {
  Bookmark,
  Like,
  List,
  Post,
  Task,
  User,
  Comment,
} from "@prisma/client";
import {
  IBookmark,
  IComment,
  ILike,
  IList,
  IPost,
  ITask,
  IUser,
} from "./api_types";

const domainFullUser = (user: IUser) => {
  return {
    ...user,
    id: user.id ?? v4(),
    aboutUser: user.aboutUser ?? null,
    avatar: user.avatar ?? null,
    birthday: user.birthday ?? null,
    job: user.job ?? null,
    gender: user.gender ?? null,
    location: user.location ?? null,
    profileBackground: user.profileBackground ?? null,
    status: user.status ?? null,
  } as User;
};

export const domainFullPost = (post: IPost) => {
  return {
    ...post,
    id: post.id ?? v4(),
    title: post.title ?? null,
    image: post.image ?? null,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : new Date(),
  } as Post;
};
export const domainFullTask = (task: ITask) => {
  return {
    ...task,
    id: task.id ?? v4(),
    deadLine: task.deadLine ?? null,
    description: task.description ?? null,
    titleColor: task.titleColor ?? null,
  } as Task;
};

export const domainFullList = (list: IList) => {
  return {
    ...list,
    id: list.id ?? v4(),
    titleColor: list.titleColor ?? null,
    color: list.color ?? null,
  } as List;
};

export const domainFullComment = (comment: IComment) => {
  return {
    ...comment,
    id: comment.id ?? v4(),
    publishedAt: comment.publishedAt
      ? new Date(comment.publishedAt)
      : new Date(),
  } as Comment;
};

const domainUser = (user: IUser) => user as User;
const domainPost = (post: IPost) => post as Post;
const domainTask = (task: ITask) => task as Task;
const domainList = (list: IList) => list as List;
const domainLike = (like: ILike) => like as Like;
const domainBookmark = (bookmark: IBookmark) => bookmark as Bookmark;
const domainComment = (comment: IComment) => comment as Comment;

const toDomainValueParser = {
  domainFullUser,
  domainFullTask,
  domainPost,
  domainTask,
  domainList,
  domainLike,
  domainBookmark,
  domainComment,
  domainUser,
  domainFullPost,
  domainFullList,
  domainFullComment,
};

export default toDomainValueParser;
