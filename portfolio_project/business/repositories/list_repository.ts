/** @format */

import { List, Prisma } from "@prisma/client";
import ListEntity from "@entities/todolist/List";
import deleteOne from "./list/delete_one_list";
import findOne from "./list/find_one_list";
import update from "./list/update_list";
import create from "./list/create_list";
import { FindMany, TextSerachMany } from "./repo_types";
export const validateList = (list: List) => {
  try {
    const { id, title, titleColor, userId, color } = new ListEntity(list);
    return { id, title, titleColor, userId, color };
  } catch (error) {
    throw error;
  }
};

const findMany: FindMany<"list"> = async ({ id, ctx }) => {
  return { data: await ctx.db.list.findMany({ where: { userId: id } }) };
};

const findByTitle: TextSerachMany<"list"> = async ({ text, ctx }) => {
  const filter = `%${text}%`;
  return {
    data: await ctx.db.$queryRaw(
      Prisma.sql`SELECT * FROM LIST where title LIKE ${filter}`
    ) ?? [],
  };
};

const ListRepository = {
  create,
  findOne,
  findMany,
  update,
  findByTitle,
  deleteOne,
};
export default ListRepository;
