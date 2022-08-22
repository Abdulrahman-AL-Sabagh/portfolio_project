/** @format */

import { Bookmark, Like, List, Post, Task, User, Comment } from "@prisma/client";
import {
  IBookmark,
  IComment,
  ILike,
  IList,
  IPost,
  ITask,
  IUser,
} from "./api_types";

const domainUser = (user: IUser) => user as User;
const domainPost = (post: IPost) => post as Post;
const domainTask = (task: ITask) => task as Task;
const domainList = (list: IList) => list as List;
const domainLike = (like: ILike) => like as Like;
const domainBookmark = (bookmark: IBookmark) => bookmark as Bookmark;
const domainComment = (comment: IComment) => comment as Comment;

const toDomainValueParser = {
  domainUser,
  domainPost,
  domainTask,
  domainList,
  domainLike,
  domainBookmark,
  domainComment,
};

export default toDomainValueParser;
