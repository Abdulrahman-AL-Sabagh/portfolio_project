/** @format */

import CommentEntity from "@entities/post/PostComment";
import { Comment } from "@prisma/client";
import { allCommentData } from "@repos/CommentRepository";
import { Context } from "@repos/prismaContext";
import findOne from "./find_one_comment";

const update = async (
  commentData: Comment,
  ctx: Context
): Promise<CommentEntity> => {
  const comment = await findOne(commentData.id, ctx);
  if (!comment) throw new Error("Comment not found");

  const updatedComment = await ctx.prisma.comment.update({
    data: allCommentData(commentData),
    where: { id: comment.id },
  });
  return new CommentEntity(updatedComment);
};
export default update;
