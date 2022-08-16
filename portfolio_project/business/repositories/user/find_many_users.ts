/** @format */

import { Prisma, User } from "@prisma/client";
import {
  FindManyType,
  TextParams,
  TextSerachMany,
} from "@repos/repo_types";
import { Context } from "@repos/prismaContext";
/** @format */

export const findMany: FindManyType = async (ctx: Context) => {
  return await ctx.prisma.user.findMany();
};

export const findManyByName: TextSerachMany = async ({
  text,
  ctx,
}: TextParams): Promise<User[]> => {
  const filter = `%${text}%`;
  return ctx.prisma.$queryRaw(
    Prisma.sql`SELECT * FROM USER WHERE name LIKE ${filter}`
  );
};
