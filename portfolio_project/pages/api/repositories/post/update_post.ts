/** @format */

import { Post } from "@prisma/client";
import PostEntity from "../../entities/post/Post";
import { allPostData } from "../PostRepository";
import { Context } from "../prismaContext";
import findOne from "./find_one_post";

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
