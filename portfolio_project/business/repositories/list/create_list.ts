/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"list"> = async ({ data, ctx }) => {
  return await ctx.prisma.list.create({ data });
};

export default create;
