/** @format */

import { Delete } from "@repos/repo_types";

const deleteOne: Delete<"list"> = async ({ id, ctx }) => {
  return await ctx.prisma.list.delete({ where: { id } });
};

export default deleteOne;
