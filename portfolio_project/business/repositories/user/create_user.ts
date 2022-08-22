/** @format */
import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"user"> = async ({ data, ctx }) => {
  return  await ctx.db.user.create({ data }) ;
};

export default create;
