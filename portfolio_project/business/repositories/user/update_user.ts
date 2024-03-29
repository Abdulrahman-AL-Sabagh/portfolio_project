/** @format */

import { CreateOrUpdate } from "@repos/repo_types";

const update: CreateOrUpdate<"user"> = async ({ data, ctx }) => {
  return await ctx.db.user.update({
    data,
    where: { id: data.id },
  });
};

export default update;
