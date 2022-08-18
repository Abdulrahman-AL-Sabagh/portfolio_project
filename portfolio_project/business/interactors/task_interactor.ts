/** @format */

import TaskEntity from "@entities/todolist/Task";
import { vEmptyString, vId } from "@lib/validators";
import { Task } from "@prisma/client";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  TextSerachMany,
} from "@repos/repo_types";
import TaskRepository from "@repos/task_repository";
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

const findMany: FindMany<"task"> = ({ id, ctx }) => {
  try {
    vId.parse(id);
    return TaskRepository.findMany({ id, ctx });
  } catch (error) {
    throw error;
  }
};

const findByTitle: TextSerachMany<"task"> = ({ text, ctx }) => {
  try {
    vEmptyString.parse(text);
    return TaskRepository.findByTitle({ text, ctx });
  } catch (error) {
    throw error;
  }
};

const findByDescription: TextSerachMany<"task"> = async ({ text, ctx }) => {
  try {
    vEmptyString.parse(text);
    return TaskRepository.findByDescription({ text, ctx });
  } catch (error) {
    throw error;
  }
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
  findByTitle,
  findMany,
  findByDescription,
  checkIfTaskExists,
};

export default taskInteractor;
