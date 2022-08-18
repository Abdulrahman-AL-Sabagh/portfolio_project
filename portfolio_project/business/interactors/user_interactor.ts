/** @format */

import UserEntity from "@entities/User";
import { vEmptyString, vId } from "@lib/validators";
import { User } from "@prisma/client";
const userNotFound = new Error("User not found");
const emailTaken = new Error("Email taken");
import {
  Find,
  Delete,
  TextSerachMany,
  CreateOrUpdate,
  FindMany,
  FindAll,
} from "@repos/repo_types";
import UserRepository from "@repos/user_repository";

function validateUser(user: User) {
  try {
    const {
      id,
      name,
      email,
      avatar,
      aboutUser,
      birthday,
      gender,
      job,
      password,
      location,
      profileBackground,
      status,
    } = new UserEntity(user);
    return {
      id,
      name,
      email,
      avatar,
      aboutUser,
      birthday,
      gender,
      job,
      password,
      location,
      profileBackground,
      status,
    };
  } catch (error) {
    throw error;
  }
}

const create: CreateOrUpdate<"user"> = async ({ data, ctx }) => {
  const validUser = validateUser(data);
  const userExists = await UserRepository.findOneByEmail({
    text: data.email,
    ctx,
  });
  if (userExists) throw emailTaken;
  return await UserRepository.create({ data: validUser, ctx });
};

const findOneById: Find<"user"> = async ({ id, ctx }) => {
  try {
    vId.parse(id);
    return await UserRepository.findOneById({ id, ctx });
  } catch (error) {
    throw error;
  }
};
const findMany: FindMany<"user"> = async ({ id, ctx }) => {
  return await UserRepository.findMany({ id, ctx });
};
const findManyByName: TextSerachMany<"user"> = async ({ ctx, text }) => {
  try {
    vEmptyString.parse(text);
    const users = UserRepository.findManyByName({ ctx, text });
    return users;
  } catch (error) {
    throw error;
  }
};

const update: CreateOrUpdate<"user"> = async ({ ctx, data }) => {
  await checkIfUserExists({ id: data.id, ctx });
  return await UserRepository.update({ ctx, data: validateUser(data) });
};

const deleteOne: Delete<"user"> = async ({ ctx, id }): Promise<User> => {
  await checkIfUserExists({ id, ctx });
  return await UserRepository.deleteOne({ id, ctx });
};
const checkIfUserExists: Find<"user"> = async ({ id, ctx }) => {
  const userExists = await findOneById({ id: id, ctx });
  if (!userExists) throw userNotFound;
  return userExists;
};

const findAll: FindAll<"user"> = async (ctx) => {
  return await UserRepository.findAll(ctx);
};

const userInteractor = {
  findOneById,
  findMany,
  findAll,
  findManyByName,
  create,
  update,
  deleteOne,
  checkIfUserExists,
  errors: {
    userNotFound,
  },
};
export default userInteractor;
