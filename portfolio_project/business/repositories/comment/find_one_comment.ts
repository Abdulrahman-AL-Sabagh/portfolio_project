/** @format */

import { Find } from "@repos/repo_types";

const findOneById: Find<"comment"> = async ({ id, ctx }) => {
  return await ctx.prisma.comment.findUnique({ where: { id } });
};

export default findOneById;
