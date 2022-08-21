/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const update: CreateOrUpdate<"comment"> = async ({ data, ctx }) => {
  return {
    data: await ctx.db.comment.update({
      data: data,
      where: { id: data.id },
    }),
  };
};
export default update;
