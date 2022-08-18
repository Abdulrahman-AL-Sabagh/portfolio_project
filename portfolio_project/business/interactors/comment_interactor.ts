/** @format */

import CommentEntity from "@entities/post/PostComment";
import { vId } from "@lib/validators";
import CommentRepository from "@repos/comment_repository";
import { CreateOrUpdate, Delete, Find } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";
import { Comment } from "@prisma/client";

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
const findOneById: Find<"comment"> = ({ id, ctx }) => {
  try {
    vId.parse(id);
    return CommentRepository.findOne({ id, ctx });
  } catch (error) {
    throw error;
  }
};
const update: CreateOrUpdate<"comment"> = async ({ data, ctx }) => {
  await checkIfCommentExists({ id: data.id, ctx });
  return await CommentRepository.update({ data: validateComment(data), ctx });
};
const deleteOne: Delete<"comment"> = async ({ id, ctx }) => {
  await checkIfCommentExists({ id, ctx });
  return await CommentRepository.deleteOne({ id, ctx });
};
const checkIfCommentExists: Find<"comment"> = async ({ id, ctx }) => {
  const commentExists = await findOneById({ id, ctx });
  if (!commentExists) throw new Error("Comment not found");
  return commentExists;
};

const commentInteractor = {
  create,
  findOneById,
  update,
  deleteOne,
  checkIfCommentExists,
};
export default commentInteractor;
