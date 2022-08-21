/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"comment"> = async({ data, ctx }) => {
  return {
    data:await ctx.db.comment.create({
      data,
    }),
  };
};
export default create;
