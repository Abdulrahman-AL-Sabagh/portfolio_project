/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"comment"> = async ({ data, ctx }) => {
  return await ctx.db.comment.create({
    data: data,
  });
};
export default create;
