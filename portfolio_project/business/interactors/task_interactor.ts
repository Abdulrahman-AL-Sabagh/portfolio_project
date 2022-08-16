/** @format */

import TaskEntity from "@entities/todolist/Task";
import { vId } from "@lib/validators";
import { Task } from "@prisma/client";
import { CreateOrUpdate, Delete, Find } from "@repos/repo_types";
import TaskRepository from "@repos/TaskRepository";
import listInteractor from "./list_interactor";

const validateTask = (data: Task) => {
  try {
    const { id, title, titleColor, deadLine, description, listId } =
      new TaskEntity(data);
    return { id, title, titleColor, deadLine, description, listId };
  } catch (error) {
    throw error;
  }
};

const create: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  await listInteractor.checkIfListExists({ id: data.listId, ctx });

  return TaskRepository.create({ data: validateTask(data), ctx });
};

const findOneById: Find<"task"> = ({ id, ctx }) => {
  try {
    vId.parse(id);
    return TaskRepository.findOneById({ id, ctx });
  } catch (error) {
    throw error;
  }
};

const update: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  await checkIfTaskExists({ id: data.id, ctx });
  return TaskRepository.update({ data: validateTask(data), ctx });
};
const deleteOne: Delete<"task"> = async ({ id, ctx }) => {
  await checkIfTaskExists({ id, ctx });
  return TaskRepository.deleteOne({ id, ctx });
};

const checkIfTaskExists: Find<"task"> = async ({ id, ctx }) => {
  const taskExists = await findOneById({ id, ctx });
  if (!taskExists) throw new Error("Task not found");
  return taskExists;
};

const taskInteractor = {
  create,
  findOneById,
  update,
  deleteOne,
  checkIfTaskExists,
};

export default taskInteractor;
