/** @format */
import { Delete } from "@repos/repo_types";

const deleteOne: Delete<"post"> = async ({ id, ctx }) => {
  return await ctx.db.post.delete({ where: { id } });
};

export default deleteOne;
