/** @format */

import PostEntity from "@entities/post/Post";
import { Post } from "@prisma/client";
import PostRepository from "@repos/post_repository";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindAll,
  FindMany,
  IdFilter,
  TextSerachMany,
} from "@repos/repo_types";
import {
  invalidID,
  invalidSearchParam,
  postNotFound,
  userNotFound,
} from "./errors";
import { validateId, validateText } from "./helpers";
import userInteractor from "./user_interactor";

export const validatePost = (postData: Post) => {
  try {
    const validatedPostData = new PostEntity(postData);
    return {
      id: validatedPostData.id,
      title: validatedPostData.title,
      description: validatedPostData.description,
      image: validatedPostData.image,
      publishedAt: validatedPostData.publishedAt,
      userId: validatedPostData.userId,
    };
  } catch (error) {
    throw error;
  }
};

const findOneById: Find<"post"> = async (idFilter) => {
  const validId = await validateId(idFilter.id);
  if (!validId) return invalidID;
  return await PostRepository.findOneById(idFilter);
};

const create: CreateOrUpdate<"post"> = async ({ data, ctx }) => {
  const userExists = await userInteractor.checkIfUserExists({
    id: data.id,
    ctx,
  });
  if (!userExists) return userNotFound;

  return await PostRepository.create({ data: validatePost(data), ctx });
};
const update: CreateOrUpdate<"post"> = async ({ data, ctx }) => {
  const postExists = await checkIfPostExists({ id: data.id, ctx });
  if (!postExists) return postNotFound;
  return await PostRepository.update({ data: validatePost(data), ctx });
};
const deleteOne: Delete<"post"> = async ({ id, ctx }) => {
  const postExists = await checkIfPostExists({ id, ctx });
  if (!postExists) return postNotFound;
  return await PostRepository.deleteOne({ id, ctx });
};
const checkIfPostExists = async (idFilter: IdFilter): Promise<boolean> => {
  const postExists = await findOneById(idFilter);
  console.log(postExists);
  return !!postExists.data;
};
const findMany: FindMany<"post"> = async ({ id, ctx }) => {
  const postExists = await checkIfPostExists({ id, ctx });
  if (!postExists) return postNotFound;
  return await PostRepository.findMany({ id, ctx });
};
const findAll: FindAll<"post"> = async (ctx) => {
  return await PostRepository.findAll(ctx);
};

const findByTitle: TextSerachMany<"post"> = async ({ text, ctx }) => {
  const validText = validateText(text);
  if (!validText) return invalidSearchParam;
  return await PostRepository.findByTitle({ text, ctx });
};
const findByContent: TextSerachMany<"post"> = async ({ text, ctx }) => {
  const validText = validateText(text);
  if (!validText) return invalidSearchParam;
  return await PostRepository.findByContent({ text, ctx });
};

const postInteractor = {
  create,
  findOneById,
  findByContent,
  findByTitle,
  findMany,
  findAll,
  update,
  deleteOne,
  checkIfPostExists,

  errors: {
    postNotFound,
  },
};
export default postInteractor;
