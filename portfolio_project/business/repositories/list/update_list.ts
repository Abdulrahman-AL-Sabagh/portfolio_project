/** @format */

import { CreateOrUpdate } from "@repos/repo_types";
const update: CreateOrUpdate<"list"> = async ({ data, ctx }) => {
  return await ctx.prisma.list.update({
    where: { id: data.id },
    data,
  });
};

export default update;
