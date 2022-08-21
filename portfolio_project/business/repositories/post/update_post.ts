/** @format */
import { CreateOrUpdate } from "@repos/repo_types";

const update: CreateOrUpdate<"post"> = async ({ data, ctx }) => {
  return {
    data: await ctx.db.post.update({
      data,
      where: { id: data.id },
    }),
  };
};

export default update;
