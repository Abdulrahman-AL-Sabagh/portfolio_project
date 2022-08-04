/** @format */

import { Context } from "../prismaContext";
import { Comment } from "@prisma/client";
import CommentEntity from "../../entities/post/PostComment";
import UserRepository from "../UserRepository";
import PostRepository from "../PostRepository";
import { allCommentData } from "../CommentRepository";

const create = async (
  commentData: Comment,
  ctx: Context
): Promise<CommentEntity> => {
  const { userId, postId } = commentData;

  const user = UserRepository.findOne(userId, ctx);
  const post = PostRepository.findOne(postId, ctx);

  if (!user) throw new Error("User not found");
  if (!post) throw new Error("Post not found");
  const comment = await ctx.prisma.comment.create({
    data: allCommentData(commentData),
  });
  return new CommentEntity(comment);
};
export default create;