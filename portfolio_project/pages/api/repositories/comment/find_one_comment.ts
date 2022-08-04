import { vId } from "../../../../lib/validators";
import CommentEntity from "../../entities/post/PostComment";
import { Context } from "../prismaContext";

const findOne = async (
    id: string,
    ctx: Context
  ): Promise<CommentEntity | null> => {
    try {
      vId.parse(id);
    } catch (error) {
      throw error;
    }
    const comment = await ctx.prisma.comment.findUnique({ where: { id } });
    if (!comment) return null;
    return new CommentEntity(comment);
  };

  export default findOne;