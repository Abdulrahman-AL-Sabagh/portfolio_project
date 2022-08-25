/** @format */

import { Context } from "@repos/prismaContext";
import {
  IComment,
  IList,
  IPost,
  ITask,
  IUser,
} from "business/parsers/api_types";

export type DBContext = { db: Context };
export type IdArgs = { id: string };

export type UserArgs = { user: IUser };
export type PostArgs = { post: IPost };
export type ListArgs = { list: IList };
export type TaskArgs = { task: ITask };
export type CommentArgs = { comment: IComment };
