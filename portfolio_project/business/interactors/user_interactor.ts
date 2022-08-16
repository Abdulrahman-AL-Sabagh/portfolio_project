/** @format */

import UserEntity from "@entities/User";
import { vEmail, vEmptyString, vId } from "@lib/validators";
import { User } from "@prisma/client";
const userNotFound = new Error("User not found");
const emailTaken = new Error("Email taken");
import {
  Find,
  Delete,
  TextSerachMany,
  CreateOrUpdate,
  FindMany,
} from "@repos/repo_types";
import UserRepository from "@repos/UserRepository";
import { hashSync } from "bcrypt";

function validateUser(user: User) {
  let validatedUser: UserEntity;
  try {
    validatedUser = new UserEntity(user);
  } catch (error) {
    throw error;
  }
  return {
    name: validatedUser.name,
    email: validatedUser.email,
    password: hashSync(validatedUser.password, 10),
    avatar: validatedUser.avatar,
    aboutUser: validatedUser.aboutUser,
    birthday: validatedUser.birthday,
    gender: validatedUser.gender,
    job: validatedUser.job,
    status: validatedUser.status,
    location: validatedUser.location,
    profileBackground: validatedUser.profileBackground,
  };
}

const create: CreateOrUpdate<"user"> = async ({ data, ctx }) => {
  try {
    vEmail.parse(data.email);
    const userExists = await UserRepository.findOneByEmail({
      text: data.email,
      ctx,
    });
    if (userExists) throw emailTaken;
    return await UserRepository.create({ data: validateUser(data), ctx });
  } catch (error) {
    throw error;
  }
};
const findOneById: Find<"user"> = async ({ id, ctx }) => {
  try {
    vId.parse(id);
    return await UserRepository.findOneById({ id, ctx });
  } catch (error) {
    throw error;
  }
};
const findMany: FindMany<"user"> = async (ctx) => {
  return await UserRepository.findMany(ctx);
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
  checkIfUserExists({ id: data.id, ctx });
  return await UserRepository.update({ ctx, data: validateUser(data) });
};

const deleteOne: Delete<"user"> = async ({ ctx, id }): Promise<User> => {
  checkIfUserExists({ id, ctx });
  return await UserRepository.deleteOne({ id, ctx });
};
const checkIfUserExists: Find<"user"> = async ({ id, ctx }) => {
  const userExists = await findOneById({ id: id, ctx });
  if (!userExists) throw userNotFound;
  return userExists;
};

const userInteractor = {
  findOneById,
  findMany,
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
