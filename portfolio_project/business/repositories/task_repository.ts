/** @format */
import { Prisma, Task } from "@prisma/client";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  TextSerachMany,
} from "./repo_types";

const create: CreateOrUpdate<"task"> = ({ data, ctx }) => {
  return ctx.db.task.create({ data });
};

const findOneById: Find<"task"> = ({ id, ctx }) => {
  return ctx.db.task.findUnique({ where: { id } });
};

const update: CreateOrUpdate<"task"> = ({ data, ctx }) => {
  return ctx.db.task.update({
    where: { id: data.id },
    data,
  });
};

const deleteOne: Delete<"task"> = ({ id, ctx }) => {
  return ctx.db.task.delete({ where: { id } });
};

const findMany: FindMany<"task"> = ({ id, ctx }) => {
  return ctx.db.task.findMany({ where: { listId: id } });
};
const findByTitle: TextSerachMany<"task"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.db.$queryRaw(
    Prisma.sql`SELECT * FROM TASK WHERE title LIKE ${filter} `
  ) as Promise<Task[]>;
};

const findByDescription: TextSerachMany<"task"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.db.$queryRaw(
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
