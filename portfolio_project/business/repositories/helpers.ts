/** @format */

import PostEntity from "@entities/post/Post";
import UserEntity from "@entities/User";
import PostRepository from "@repos/PostRepository";
import { Context } from "@repos/prismaContext";
import UserRepository from "@repos/UserRepository";
import { vId } from "@lib/validators";

export async function checkIfUserAndPostExist(
  userId: string,
  postId: string,
  ctx: Context
): Promise<{ user: UserEntity; post: PostEntity }> {
  try {
    vId.parse(userId);
    vId.parse(postId);
    const user = await UserRepository.findOne(userId, ctx);
    const post = await PostRepository.findOne(postId, ctx);
    if (!user) throw new Error("User not found");
    if (!post) throw new Error("Post not found");
    return { user, post };
  } catch (error) {
    throw error;
  }
}
