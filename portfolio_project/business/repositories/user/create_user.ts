/** @format */
import { User } from "@prisma/client";
import { CreateOrUpdate } from "@repos/repo_types";

const create:CreateOrUpdate = async ({ data, ctx }): Promise<User> => {
  return await ctx.prisma.user.create({ data });
};

export default create;
