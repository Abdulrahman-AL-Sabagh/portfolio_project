/** @format */

import ListEntity from "@entities/todolist/List";
import { vId } from "@lib/validators";
import { List } from "@prisma/client";
import ListRepository from "@repos/ListRepository";
import { CreateOrUpdate, Delete, Find } from "@repos/repo_types";
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
  return await ListRepository.update({ data:validateList(data), ctx });
};

const deleteOne: Delete<"list"> = async ({ id, ctx }) => {
  await checkIfListExists({ id, ctx });
  return ListRepository.deleteOne({ id, ctx });
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
};

export default listInteractor;
