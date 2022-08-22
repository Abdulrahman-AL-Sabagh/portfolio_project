/** @format */
import { Delete } from "@repos/repo_types";
const deleteOne: Delete<"user"> = async ({ id, ctx }) => {
  return await ctx.db.user.delete({ where: { id } });
};
export default deleteOne;
