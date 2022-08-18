/** @format */

import PostEntity from "@entities/post/Post";
import { vEmail, vEmptyString, vId } from "@lib/validators";
import { Post } from "@prisma/client";
import PostRepository from "@repos/post_repository";
import {
  CreateOrUpdate,
  Delete,
  Find,
  FindAll,
  FindMany,
  TextSearch,
  TextSerachMany,
} from "@repos/repo_types";
import userInteractor from "./user_interactor";

const postNotFound = new Error("Post not found");
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

const findOneById: Find<"post"> = ({ id, ctx }) => {
  try {
    vId.parse(id);
    return PostRepository.findOneById({ id, ctx });
  } catch (error) {
    throw error;
  }
};

const create: CreateOrUpdate<"post"> = async ({ data, ctx }) => {
  await userInteractor.checkIfUserExists({ id: data.id, ctx });
  await checkIfPostExists({ id: data.id, ctx });

  return await PostRepository.create({ data: validatePost(data), ctx });
};
const update: CreateOrUpdate<"post"> = async ({ data, ctx }) => {
  await checkIfPostExists({ id: data.id, ctx });
  return await PostRepository.update({ data: validatePost(data), ctx });
};
const deleteOne: Delete<"post"> = async ({ id, ctx }) => {
  await checkIfPostExists({ id, ctx });
  return await PostRepository.deleteOne({ id, ctx });
};
const checkIfPostExists: Find<"post"> = async ({ id, ctx }) => {
  const postExists = await findOneById({ id, ctx });
  if (!postExists) throw postNotFound;
  return postExists;
};
const findMany: FindMany<"post"> = async ({ id, ctx }) => {
  await checkIfPostExists({ id, ctx });
  return await PostRepository.findMany({ id, ctx });
};
const findAll: FindAll<"post"> = async (ctx) => {
  return await PostRepository.findAll(ctx);
};

const findByTitle: TextSerachMany<"post"> = async ({ text, ctx }) => {
  try {
    vEmptyString.parse(text);
    return await PostRepository.findByTitle({ text, ctx });
  } catch (error) {
    throw error;
  }
};
const findByContent: TextSerachMany<"post"> = async ({ text, ctx }) => {
  try {
    vEmptyString.parse(text);
    return await PostRepository.findByContent({ text, ctx });
  } catch (error) {
    throw error;
  }
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
