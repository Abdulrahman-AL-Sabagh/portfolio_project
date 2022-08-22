/** @format */

import CommentEntity from "@entities/post/PostComment";
import CommentRepository from "@repos/comment_repository";
import { CreateOrUpdate, Delete, Find, IdFilter } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";
import { Comment } from "@prisma/client";
import { validateId } from "./helpers";
import { commentNotFound, invalidID } from "./errors";

export const validateComment = (comment: Comment) => {
  try {
    const validComment = new CommentEntity(comment);
    return {
      id: validComment.id,
      userId: validComment.userId,
      postId: validComment.postId,
      content: validComment.content,
      publishedAt: validComment.publishedAt,
    };
  } catch (error) {
    throw error;
  }
};

const create: CreateOrUpdate<"comment"> = async ({ data, ctx }) => {
  await userInteractor.checkIfUserExists({ id: data.userId, ctx });
  await postInteractor.checkIfPostExists({ id: data.postId, ctx });

  return await CommentRepository.create({ data: validateComment(data), ctx });
};
const findOneById: Find<"comment"> = async (idFilter) => {
  const validId = await validateId(idFilter.id);
  if (!validId) throw invalidID;
  return await CommentRepository.findOne(idFilter);
};
const update: CreateOrUpdate<"comment"> = async ({ data, ctx }) => {
  const commentExists = await checkIfCommentExists({ id: data.id, ctx });
  if (!commentExists) throw commentNotFound;
  return await CommentRepository.update({ data: validateComment(data), ctx });
};
const deleteOne: Delete<"comment"> = async (idFilter) => {
  const commentExists = await checkIfCommentExists(idFilter);
  if (!commentExists) throw commentNotFound;
  return await CommentRepository.deleteOne(idFilter);
};
const checkIfCommentExists = async (idFilter: IdFilter): Promise<boolean> => {
  const validComment = await findOneById(idFilter);
  return !!validComment;
};

const commentInteractor = {
  create,
  findOneById,
  update,
  deleteOne,
  checkIfCommentExists,
};
export default commentInteractor;
