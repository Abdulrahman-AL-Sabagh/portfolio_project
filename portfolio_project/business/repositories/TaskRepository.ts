/** @format */

import TaskEntity from "@entities/todolist/Task";
import { Task } from "@prisma/client";
import { Context } from "./prismaContext";
import ListRepository from "./ListRepository";
import { vId } from "@lib/validators";

export const allTaskData = (data: Task) => {
  try {
    const { id, title, titleColor, deadLine, description, listId } =
      new TaskEntity(data);
    return { id, title, titleColor, deadLine, description, listId };
  } catch (error) {
    throw error;
  }
};

const create = async (data: Task, ctx: Context) => {
  const list = await ListRepository.findOne(data.id, ctx);
  if (!list) throw new Error("List not found");
  const task = await ctx.prisma.task.create({ data });
  return new TaskEntity(task);
};

const findOne = async (id: string, ctx: Context) => {
  try {
    vId.parse(id);
    const task = await ctx.prisma.task.findUnique({ where: { id } });
    if (!task) return null;
    return new TaskEntity(task);
  } catch (error) {
    throw error;
  }
};

const update = async (data: Task, ctx: Context) => {
  const taskExists = await findOne(data.id, ctx);
  if (!taskExists) throw new Error("Task not found");
  const task = await ctx.prisma.task.update({ where: { id: data.id }, data });
  return new TaskEntity(task);
};

const deleteOne = async (id: string, ctx: Context) => {
  const taskExists = await findOne(id, ctx);
  if (!taskExists) throw new Error("Task not found");
  const task = await ctx.prisma.task.delete({ where: { id } });
  return new TaskEntity(task);
};
const TaskRepository = {
  create,
  findOne,
  update,
  deleteOne,
};

export default TaskRepository;
