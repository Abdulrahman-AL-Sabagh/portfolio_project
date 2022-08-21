/** @format */

import { Prisma } from "@prisma/client";
import { FindMany, TextSerachMany } from "@repos/repo_types";

/** @format */

export const findMany: FindMany<"user"> = async ({ id, ctx }) => {
  return { data: await ctx.db.user.findMany({ where: { NOT: { id } } }) };
};

export const findManyByName: TextSerachMany<"user"> = async ({ text, ctx }) => {
  const filter = `%${text}%`;

  return {
    data:
      (await ctx.db.$queryRaw(
        Prisma.sql`SELECT * FROM USER WHERE name LIKE ${filter}`
      )) ?? [],
  };
};
