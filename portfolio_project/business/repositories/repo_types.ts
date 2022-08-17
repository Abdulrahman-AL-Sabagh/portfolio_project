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
import { InteractivityProps } from "@chakra-ui/react";

export interface IdFilter {
  id: string;
  ctx: Context;
}
export interface TextParams {
  text: string;
  ctx: Context;
}
export interface InteractionParams {
  userId: string;
  postId: string;
  ctx: Context;
}

type Schemas = {
  user: User;
  post: Post;
  list: List;
  like: Like;
  bookmark: Bookmark;
  comment: Comment;
  task: Task;
};

type Interactions = { like: Like; bookmark: Bookmark };

//Return values

type ReturnValue<K extends keyof Schemas> = Promise<Schemas[K]>;
type InteractionValue<K extends keyof Interactions> = Promise<Interactions[K]>;
type FindManyValue<K extends keyof Schemas> = Promise<Array<Schemas[K]>>;
type FindValue<K extends keyof Schemas> = Promise<Schemas[K] | null>;
type FindInteractionValue<K extends keyof Interactions> = Promise<
  Interactions[K] | null
>;
//Find and Delete for all
export type Find<K extends keyof Schemas> = (filter: IdFilter) => FindValue<K>;
export type FindAll<K extends "user" | "post"> = (
  ctx: Context
) => FindManyValue<K>;

export type TextSearch<K extends keyof Schemas> = (
  filter: TextParams
) => FindValue<K>;

export type FindMany<K extends keyof Schemas> = (
  filter: IdFilter
) => FindManyValue<K>;

export type TextSerachMany<K extends keyof Schemas> = (
  filter: TextParams
) => FindManyValue<K>;

export type Delete<K extends keyof Schemas> = (
  filter: IdFilter
) => ReturnValue<K>;

//Find and Delete for Interactions

export type DeleteInteraction<K extends keyof Interactions> = (
  filter: InteractionParams
) => InteractionValue<K>;
export type FindInteraction<K extends keyof Interactions> = (
  filter: InteractionParams
) => FindInteractionValue<K>;

export type FindManyComments<K extends "comment"> = (
  filter: InteractionParams
) => Promise<(Schemas[K])[]>;

// Schema CREATE AND UPDATE TYPE DEFS
export type SchemaType<K extends keyof Schemas> = {
  data: Schemas[K];
  ctx: Context;
};
//User
export type CreateOrUpdate<K extends keyof Schemas> = (
  args: SchemaType<K>
) => Promise<Schemas[K]>;

//Post

// Like

//Find all users, posts
