/** @format */

import { Post } from "@prisma/client";
import PostEntity from "@entities/post/Post";
import findOne from "./find_one_post";
import { allPostData } from "../PostRepository";
import { Context } from "../prismaContext";

const update = async (post: Post, ctx: Context): Promise<PostEntity> => {
  const foundPost = await findOne(post.id, ctx);
  if (!foundPost) {
    throw new Error("Post not found");
  }
  const updatedPost = await ctx.prisma.post.update({
    data: allPostData(post),
    where: { id: post.id },
  });
  return new PostEntity(updatedPost);
};

export default update;
