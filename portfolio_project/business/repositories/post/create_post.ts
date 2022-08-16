/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"post"> = async ({ data, ctx }) => {
  return await ctx.prisma.post.create({ data });
};
export default create;
