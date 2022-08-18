/** @format */

import { Prisma } from "@prisma/client";
import create from "./post/create_post";
import findOneById from "./post/find_one_post";
import update from "./post/update_post";
import deleteOne from "./post/delete_post";
import { FindAll, FindMany, TextSerachMany } from "./repo_types";

const findAll: FindAll<"post"> = (ctx) => {
  return ctx.db.post.findMany({});
};
const findMany: FindMany<"post"> = ({ id, ctx }) => {
  return ctx.db.post.findMany({ where: { userId: id } });
};

const findByTitle: TextSerachMany<"post"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.db.$queryRaw(
    Prisma.sql`SELECT * FROM POST WHERE title LIKE ${filter}`
  );
};
const findByContent: TextSerachMany<"post"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.db.$queryRaw(
    Prisma.sql`SELECT * FROM POST WHERE content LIKE ${filter}`
  );
};
const PostRepository = {
  create,
  findOneById,
  findAll,
  findByTitle,
  findByContent,
  findMany,
  update,
  deleteOne,
};
export default PostRepository;
