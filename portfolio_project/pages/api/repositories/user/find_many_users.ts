/** @format */

import { Context } from "./../prismaContext";
/** @format */

const findMany = async (ctx: Context) => {
  return await ctx.prisma.user.findMany();
};

export default findMany;
