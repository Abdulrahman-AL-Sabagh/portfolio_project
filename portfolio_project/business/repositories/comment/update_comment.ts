/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const update: CreateOrUpdate<"comment"> = async ({ data, ctx }) => {
  return await ctx.prisma.comment.update({
    data: data,
    where: { id: data.id },
  });
};
export default update;
