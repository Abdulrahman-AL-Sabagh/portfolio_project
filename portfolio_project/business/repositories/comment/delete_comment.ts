/** @format */

import { Delete } from "@repos/repo_types";

const deleteOne: Delete<"comment"> = async ({ id, ctx }) => {
  return await ctx.db.comment.delete({ where: { id } });
};
export default deleteOne;
