/** @format */

import { Prisma } from "@prisma/client";
import findOne from "./comment/find_one_comment";
import create from "./comment/create_comment";
import update from "./comment/update_comment";
import deleteOne from "./comment/delete_comment";
import { FindMany, FindManyComments, TextSerachMany } from "./repo_types";

const findByContent: TextSerachMany<"comment"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.prisma.$queryRaw(
    Prisma.sql`SELECT * FROM COMMENT where content LIKE ${filter} `
  );
};

const findUserComments: FindMany<"comment"> = ({ id, ctx }) => {
  return ctx.prisma.comment.findMany({
    where: { userId: id },
  });
};
const findPostComments: FindMany<"comment"> = ({ id, ctx }) => {
  return ctx.prisma.comment.findMany({
    where: { postId: id },
  });
};
const findUserCommentsOnPost: FindManyComments<"comment"> = ({
  userId,
  postId,
  ctx,
}) => {
  return ctx.prisma.comment.findMany({
    where: { userId, postId },
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
