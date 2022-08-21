/** @format */

import { Delete } from "@repos/repo_types";

const deleteOne: Delete<"list"> =async ({ id, ctx }) => {
  return { data: await ctx.db.list.delete({ where: { id } }) };
};

export default deleteOne;
