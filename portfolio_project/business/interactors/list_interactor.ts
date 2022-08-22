/** @format */

import ListEntity from "@entities/todolist/List";
import { vEmptyString } from "@lib/validators";
import { List } from "@prisma/client";
import ListRepository from "@repos/list_repository";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindMany,
  IdFilter,
  TextSerachMany,
} from "@repos/repo_types";
import {
  invalidID,
  invalidSearchParam,
  listNotFound,
  userNotFound,
} from "./errors";
import { validateId, validateText } from "./helpers";
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
  const userExists = await userInteractor.checkIfUserExists({
    id: data.userId,
    ctx,
  });
  if (!userExists) throw userNotFound;
  return await ListRepository.create({ data: validateList(data), ctx });
};

const findOneById: Find<"list"> = async (idFilter) => {
  const validId = await validateId(idFilter.id);
  if (!validId) throw invalidID;
  return await ListRepository.findOne(idFilter);
};

const update: CreateOrUpdate<"list"> = async ({ data, ctx }) => {
  if (!validateId(data.id)) throw listNotFound;
  return await ListRepository.update({ data: validateList(data), ctx });
};

const deleteOne: Delete<"list"> = async (idFilter) => {
  const listExists = await checkIfListExists(idFilter);
  if (!listExists) throw listNotFound;
  return await ListRepository.deleteOne(idFilter);
};
const findByTitle: TextSerachMany<"list"> = async ({ text, ctx }) => {
  const validText = validateText(text);
  if (!validText) throw invalidSearchParam;
  return await ListRepository.findByTitle({ text, ctx });
};
const findMany: FindMany<"list"> = async (idFilter) => {
  const validId = await validateId(idFilter.id);
  if (!validId) throw userNotFound;
  return ListRepository.findMany(idFilter);
};

const checkIfListExists = async (idFilter: IdFilter): Promise<boolean> => {
  const listExists = await findOneById(idFilter);
  return !!listExists;
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
