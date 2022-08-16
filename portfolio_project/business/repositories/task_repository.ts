/** @format */

import TaskEntity from "@entities/todolist/Task";
import { Task } from "@prisma/client";
import { CreateOrUpdate, Delete, Find } from "./repo_types";

const create: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  return await ctx.prisma.task.create({ data });
};

const findOneById: Find<"task"> = async ({ id, ctx }) => {
  return await ctx.prisma.task.findUnique({ where: { id } });
};

const update: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  return await ctx.prisma.task.update({
    where: { id: data.id },
    data,
  });
};

const deleteOne: Delete<"task"> = async ({ id, ctx }) => {
  return await ctx.prisma.task.delete({ where: { id } });
};
const TaskRepository = {
  create,
  findOneById,
  update,
  deleteOne,
};

export default TaskRepository;
