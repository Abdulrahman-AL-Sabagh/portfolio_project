/** @format */
import { Prisma } from "@prisma/client";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  TextSerachMany,
} from "./repo_types";

const create: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  return await ctx.db.task.create({ data });
};

const findOneById: Find<"task"> = async ({ id, ctx }) => {
  return await ctx.db.task.findUnique({ where: { id } });
};

const update: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  return await ctx.db.task.update({
    where: { id: data.id },
    data,
  });
};

const deleteOne: Delete<"task"> = async ({ id, ctx }) => {
  return await ctx.db.task.delete({ where: { id } });
};

const findMany: FindMany<"task"> = async ({ id, ctx }) => {
  return await ctx.db.task.findMany({ where: { listId: id } });
};
const findByTitle: TextSerachMany<"task"> = async ({ text, ctx }) => {
  const filter = `%${text}%`;
  return await ctx.db.$queryRaw(
    Prisma.sql`SELECT * FROM TASK WHERE title LIKE ${filter} `
  );
};

const findByDescription: TextSerachMany<"task"> = async ({ text, ctx }) => {
  const filter = `%${text}%`;
  return {
    data: await ctx.db.$queryRaw(
      Prisma.sql`SELECT * FROM TASK WHERE description LIKE ${filter} `
    ),
  };
};

const TaskRepository = {
  create,
  findOneById,
  findMany,
  findByTitle,
  findByDescription,
  update,
  deleteOne,
};

export default TaskRepository;
