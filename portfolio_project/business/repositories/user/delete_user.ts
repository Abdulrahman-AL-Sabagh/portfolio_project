/** @format */
import { Delete } from "@repos/repo_types";
const deleteOne: Delete = async ({ id, ctx }) => {
  return await ctx.prisma.user.delete({ where: { id } });
};
export default deleteOne;
