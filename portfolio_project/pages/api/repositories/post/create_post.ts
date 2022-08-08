import { Post } from "@prisma/client";
import PostEntity from "@entities/post/Post";
import { allPostData } from "../PostRepository";
import { Context } from "../prismaContext";
import UserRepository from "../UserRepository";

const create = async (
    postData: Post,
    userId: string,
    ctx: Context
  ): Promise<PostEntity> => {
    const user = await UserRepository.findOne(userId, ctx);
    if (!user) {
      throw new Error("User not found");
    }
    const post = await ctx.prisma.post.create({
      data: allPostData(postData),
    });
    return new PostEntity(post);
  };
export default create;  