/** @format */

import { Context } from "../prismaContext";
import { Comment } from "@prisma/client";
import CommentEntity from "../../entities/post/PostComment";
import { allCommentData } from "../CommentRepository";
import { checkIfUserAndPostExist } from "../helpers";

const create = async (
  commentData: Comment,
  ctx: Context
): Promise<CommentEntity> => {
  const { userId, postId } = commentData;

  await checkIfUserAndPostExist(userId, postId, ctx);
  const comment = await ctx.prisma.comment.create({
    data: allCommentData(commentData),
  });
  return new CommentEntity(comment);
};
export default create;
