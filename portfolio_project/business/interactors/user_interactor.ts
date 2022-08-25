/** @format */
import UserEntity from "@entities/User";
import { vEmail } from "@lib/validators";
import { User } from "@prisma/client";
import {
  emailTaken,
  invalidID,
  invalidSearchParam,
  userNotFound,
} from "./errors";
import {
  Find,
  Delete,
  TextSerachMany,
  CreateOrUpdate,
  FindMany,
  FindAll,
  IdFilter,
} from "@repos/repo_types";
import UserRepository from "@repos/user_repository";
import { validateId, validateText } from "./helpers";

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
  const validEmail = vEmail.safeParse(data.email);
  if (!validEmail.success) throw validEmail.error.message;
  const userExists = await UserRepository.findOneByEmail({
    text: data.email,
    ctx,
  });
  if (userExists) throw emailTaken;
  return await UserRepository.create({ data: validateUser(data), ctx });
};

const findOneById: Find<"user"> = async ({ id, ctx }) => {
  const validId = await validateId(id);
  if (!validId) throw invalidID;
  return await UserRepository.findOneById({ id, ctx });
};
const findMany: FindMany<"user"> = async ({ id, ctx }) => {
  return await UserRepository.findMany({ id, ctx });
};
const findManyByName: TextSerachMany<"user"> = async ({ ctx, text }) => {
  const validInput = validateText(text);
  if (!validInput) throw invalidSearchParam;
  return await UserRepository.findManyByName({ ctx, text });
};

const update: CreateOrUpdate<"user"> = async ({ ctx, data }) => {
  const userExists = await checkIfUserExists({ id: data.id, ctx });
  if (!userExists) throw userNotFound;
  return await UserRepository.update({ ctx, data: validateUser(data) });
};

const deleteOne: Delete<"user"> = async (idFilter) => {
  const userExists = await checkIfUserExists(idFilter);
  if (!userExists) throw userNotFound;
  return await UserRepository.deleteOne(idFilter);
};
const checkIfUserExists = async (idFilter: IdFilter): Promise<boolean> => {
  const userExists = await findOneById(idFilter);
  return !!userExists;
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
};
export default userInteractor;
