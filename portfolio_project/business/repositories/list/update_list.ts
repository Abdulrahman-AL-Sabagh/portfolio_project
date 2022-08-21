/** @format */

import { CreateOrUpdate } from "@repos/repo_types";
const update: CreateOrUpdate<"list"> = async ({ data, ctx }) => {
  return {
    data: await ctx.db.list.update({
      where: { id: data.id },
      data,
    }),
  };
};

export default update;
