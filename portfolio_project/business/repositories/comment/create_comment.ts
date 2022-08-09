/** @format */

import CommentEntity from "@entities/post/PostComment";
import { Comment } from "@prisma/client";
import { Context } from "@repos/prismaContext";
import { allCommentData } from "@repos/CommentRepository";
import { checkIfUserAndPostExist } from "@repos/helpers";

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
