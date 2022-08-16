/** @format */
import { User } from "@prisma/client";
import { Find, IdFilter, TextParams, TextSearch } from "@repos/repo_types";

export const findOneById: Find<"user"> = async ({ id, ctx }) => {
  return await ctx.prisma.user.findUnique({ where: { id } });
};

export const findOneByEmail: TextSearch<"user"> = async ({ text, ctx }) => {
  return await ctx.prisma.user.findUnique({ where: { email: text } });
};
