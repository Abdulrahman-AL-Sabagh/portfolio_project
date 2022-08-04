import { vId } from "../../../../lib/validators";
import PostEntity from "../../entities/post/Post";
import { Context } from "../prismaContext";

const findOne = async (
    id: string,
    ctx: Context
  ): Promise<PostEntity | null> => {
    try {
      vId.parse(id);
    } catch (error) {
      throw error;
    }
    const post = await ctx.prisma.post.findUnique({ where: { id } });
    if (!post) return null;
    return new PostEntity(post);
  };

  export default findOne