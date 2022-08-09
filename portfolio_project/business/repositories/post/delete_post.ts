import PostEntity from "@entities/post/Post";
import { Context } from "../prismaContext";
import findOne from "./find_one_post";

const deleteOne = async (id: string, ctx: Context): Promise<PostEntity> => {
    const foundPost = await findOne(id, ctx);
    if (!foundPost) {
      throw new Error("Post not found");
    }
    const post = await ctx.prisma.post.delete({ where: { id } });
    return new PostEntity(post);
  };

  export default deleteOne