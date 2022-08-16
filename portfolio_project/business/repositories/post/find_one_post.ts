/** @format */

import { Find } from "@repos/repo_types";

const findOneById: Find<"post"> = async ({ id, ctx }) => {
  return await ctx.prisma.post.findUnique({ where: { id } });
};

export default findOneById;
