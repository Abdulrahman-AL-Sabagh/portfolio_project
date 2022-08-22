/** @format */

import { Context } from "@repos/prismaContext";
import {
  User,
  Post,
  List,
  Comment,
  Bookmark,
  Like,
  Task,
} from "@prisma/client";

export interface IdFilter {
  id: string;
  ctx: Context;
}
export interface TextParams {
  text: string;
  ctx: Context;
}
export interface InteractionParams {
  data: {
    userId: string;
    postId: string;
  };
  ctx: Context;
}

export type Schemas = {
  user: User;
  post: Post;
  list: List;
  like: Like;
  bookmark: Bookmark;
  comment: Comment;
  task: Task;
};

export type ResponseError = { data: null; message: string; error: true };

export type ResponseFindValue<K extends keyof Schemas> = Promise<
  Schemas[K] | null
>;
export type ResponseValue<K extends keyof Schemas> = Promise<Schemas[K]>;
export type ManyResponseValues<K extends keyof Schemas> = Promise<Schemas[K][]>;
type Interactions = { like: Like; bookmark: Bookmark };

//Find and Delete for all
export type Find<K extends keyof Schemas> = (
  filter: IdFilter
) => ResponseFindValue<K>;
export type FindAll<K extends "user" | "post"> = (
  ctx: Context
) => ManyResponseValues<K>;

export type TextSearch<K extends keyof Schemas> = (
  filter: TextParams
) => ResponseFindValue<K>;

export type FindMany<K extends keyof Schemas> = (
  filter: IdFilter
) => ManyResponseValues<K>;

export type TextSerachMany<K extends keyof Schemas> = (
  filter: TextParams
) => ManyResponseValues<K>;

export type Delete<K extends keyof Schemas> = (
  filter: IdFilter
) => ResponseValue<K>;

//Find and Delete for Interactions

export type DeleteInteraction<K extends keyof Interactions> = (
  filter: InteractionParams
) => ResponseValue<K>;
export type FindInteraction<K extends keyof Interactions> = (
  filter: InteractionParams
) => ResponseFindValue<K>;

export type FindManyComments<K extends "comment"> = (
  filter: InteractionParams
) => ManyResponseValues<K>;

// Schema CREATE AND UPDATE TYPE DEFS
export type createAndUpdateParam<K extends keyof Schemas> = {
  data: Schemas[K];
  ctx: Context;
};
//User
export type CreateOrUpdate<K extends keyof Schemas> = (
  args: createAndUpdateParam<K>
) => ResponseValue<K>;

//Post

// Like

//Find all users, posts
