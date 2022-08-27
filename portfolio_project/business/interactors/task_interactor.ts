/** @format */

import TaskEntity from "@entities/todolist/Task";
import { vEmptyString } from "@lib/validators";
import { Task } from "@prisma/client";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  IdFilter,
  TextSerachMany,
} from "@repos/repo_types";
import TaskRepository from "@repos/task_repository";
import { invalidID, invalidSearchParam, taskNotFound } from "./errors";
import { validateId } from "./helpers";
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

const findOneById: Find<"task"> = async ({ id, ctx }) => {
  const validId = await validateId(id);
  if (!validId) throw invalidID;
  return TaskRepository.findOneById({ id, ctx });
};

const update: CreateOrUpdate<"task"> = async ({ data, ctx }) => {
  return TaskRepository.update({ data: validateTask(data), ctx });
};
const deleteOne: Delete<"task"> = async ({ id, ctx }) => {
  const taskExists = await checkIfTaskExists({ id, ctx });
  if (!taskExists) throw taskNotFound;
  return TaskRepository.deleteOne({ id, ctx });
};

const findMany: FindMany<"task"> = async ({ id, ctx }) => {
  const validId = await validateId(id);
  if (!validId) throw invalidID;

  return TaskRepository.findMany({ id, ctx });
};

const findByTitle: TextSerachMany<"task"> = async ({ text, ctx }) => {
  const validInput = vEmptyString.safeParse(text);
  if (!validInput.success) throw invalidSearchParam;
  return await TaskRepository.findByTitle({ text, ctx });
};

const findByDescription: TextSerachMany<"task"> = async ({ text, ctx }) => {
  const validInput = vEmptyString.safeParse(text);
  if (!validInput.success) throw invalidSearchParam;
  return await TaskRepository.findByDescription({ text, ctx });
};
const checkIfTaskExists = async (idFilter: IdFilter): Promise<boolean> => {
  const taskExists = await findOneById(idFilter);
  return !!taskExists;
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
