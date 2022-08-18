/** @format */

import ListEntity from "@entities/todolist/List";
import { vEmptyString, vId } from "@lib/validators";
import { List } from "@prisma/client";
import ListRepository from "@repos/list_repository";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  TextSerachMany,
} from "@repos/repo_types";
import userInteractor from "./user_interactor";

export const validateList = (list: List) => {
  try {
    const validList = new ListEntity(list);
    const { id, title, titleColor, userId, color } = validList;
    return { id, title, titleColor, userId, color };
  } catch (error) {
    throw error;
  }
};

const create: CreateOrUpdate<"list"> = async ({ data, ctx }) => {
  await userInteractor.checkIfUserExists({ id: data.userId, ctx });
  return await ListRepository.create({ data: validateList(data), ctx });
};

const findOneById: Find<"list"> = async ({ id, ctx }) => {
  try {
    vId.parse(id);
    return await ListRepository.findOne({ id, ctx });
  } catch (error) {
    throw error;
  }
};
const update: CreateOrUpdate<"list"> = async ({ data, ctx }) => {
  await checkIfListExists({ id: data.id, ctx });
  return await ListRepository.update({ data: validateList(data), ctx });
};

const deleteOne: Delete<"list"> = async ({ id, ctx }) => {
  await checkIfListExists({ id, ctx });
  return ListRepository.deleteOne({ id, ctx });
};
const findByTitle: TextSerachMany<"list"> = ({ text, ctx }) => {
  try {
    vEmptyString.parse(text);
    return ListRepository.findByTitle({ text, ctx });
  } catch (error) {
    throw error;
  }
};
const findMany: FindMany<"list"> = ({ id, ctx }) => {
  try {
    vId.parse(id);
    return ListRepository.findMany({ id, ctx });
  } catch (error) {
    throw error;
  }
};

const checkIfListExists: Find<"list"> = async ({ id, ctx }) => {
  const listExists = await findOneById({ id, ctx });
  if (!listExists) throw new Error("List not found");
  return listExists;
};

const listInteractor = {
  create,
  findOneById,
  update,
  deleteOne,
  checkIfListExists,
  findByTitle,
  findMany,
};

export default listInteractor;
