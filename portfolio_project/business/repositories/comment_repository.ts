/** @format */

import { Prisma } from "@prisma/client";
import findOne from "./comment/find_one_comment";
import create from "./comment/create_comment";
import update from "./comment/update_comment";
import deleteOne from "./comment/delete_comment";
import { FindMany, FindManyComments, TextSerachMany } from "./repo_types";

const findByContent: TextSerachMany<"comment"> = async ({ text, ctx }) => {
  const filter = `%${text}%`;
  return await ctx.db.$queryRaw(
    Prisma.sql`SELECT * FROM COMMENT where content LIKE ${filter} `
  );
};

const findUserComments: FindMany<"comment"> = async ({ id, ctx }) => {
  return await ctx.db.comment.findMany({
    where: { userId: id },
  });
};
const findPostComments: FindMany<"comment"> = async ({ id, ctx }) => {
  return await ctx.db.comment.findMany({
    where: { postId: id },
  });
};
const findUserCommentsOnPost: FindManyComments<"comment"> = async ({
  data,
  ctx,
}) => {
  return await ctx.db.comment.findMany({
    where: { ...data },
  });
};
const CommentRepository = {
  create,
  findOne,
  update,
  deleteOne,
  findByContent,
  findUserComments,
  findPostComments,
  findUserCommentsOnPost,
};

export default CommentRepository;
