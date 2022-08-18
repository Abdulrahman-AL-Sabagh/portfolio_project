/** @format */

import { Prisma } from "@prisma/client";
import { FindMany, TextSerachMany } from "@repos/repo_types";

/** @format */

export const findMany: FindMany<"user"> = ({ id, ctx }) => {
  return ctx.db.user.findMany({ where: { NOT: { id } } });
};

export const findManyByName: TextSerachMany<"user"> = ({ text, ctx }) => {
  const filter = `%${text}%`;
  return ctx.db.$queryRaw(
    Prisma.sql`SELECT * FROM USER WHERE name LIKE ${filter}`
  );
};
