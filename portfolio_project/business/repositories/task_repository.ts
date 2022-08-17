/** @format */
import { Prisma } from "@prisma/client";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  TextSerachMany,
} from "./repo_types";

const create: CreateOrUpdate<"task"> = ({ data, ctx }) => {
  return ctx.prisma.task.create({ data });
};

const findOneById: Find<"task"> = ({ id, ctx }) => {
  return ctx.prisma.task.findUnique({ where: { id } });
};

const update: CreateOrUpdate<"task"> = ({ data, ctx }) => {
  return ctx.prisma.task.update({
    where: { id: data.id },
    data,
  });
};

const deleteOne: Delete<"task"> = ({ id, ctx }) => {
  return ctx.prisma.task.delete({ where: { id } });
};

const findMany: FindMany<"task"> = ({ id, ctx }) => {
  return ctx.prisma.task.findMany({ where: { listId: id } });
};
const findByTitle: TextSerachMany<"task"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.prisma.$queryRaw(
    Prisma.sql`SELECT * FROM TASK WHERE title LIKE ${filter} `
  );
};

const findByDescription: TextSerachMany<"task"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.prisma.$queryRaw(
    Prisma.sql`SELECT * FROM TASK WHERE description LIKE ${filter} `
  );
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
