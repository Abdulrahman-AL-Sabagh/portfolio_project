import CommentEntity from "@entities/post/PostComment";
import { Context } from "@repos/prismaContext";
import findOne from "./find_one_comment";

const deleteOne = async (id: string, ctx: Context): Promise<CommentEntity> => {
    const comment = await findOne(id, ctx);
    if (!comment) throw new Error("Comment not found");
    const deletedComment = await ctx.prisma.comment.delete({ where: { id } });
    return new CommentEntity(deletedComment);
  };
  export default deleteOne