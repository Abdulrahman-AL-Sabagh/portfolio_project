/** @format */


import { UpdateType } from "@repos/repo_types";
import { User } from "@prisma/client";

const update: UpdateType = async ({ data, ctx }): Promise<User> => {
  return await ctx.prisma.user.update({
    data,
    where: { id: data.id },
  });
};

export default update;
