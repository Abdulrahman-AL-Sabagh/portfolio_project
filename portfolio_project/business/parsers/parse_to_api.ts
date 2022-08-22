/** @format */

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

const apiUser = (user: User) => user as IUser;
const apiPost = (post: Post) => post as IPost;
const apiList = (list: List) => list as IList;
const apiTask = (task: Task) => task as ITask;
const apiLike = (like: Like) => like as ILike;
const apiBookmark = (bookmark: Bookmark) => bookmark as IBookmark;
const apiComment = (comment: Comment) => comment as IComment;

const toApiValueParse = {
  apiUser,
  apiPost,
  apiList,
  apiTask,
  apiLike,
  apiBookmark,
  apiComment,
};
export default toApiValueParse;
