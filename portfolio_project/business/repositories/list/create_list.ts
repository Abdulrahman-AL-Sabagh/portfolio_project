/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"list"> =async ({ data, ctx }) => {
  return { data: await ctx.db.list.create({ data }) };
};

export default create;
