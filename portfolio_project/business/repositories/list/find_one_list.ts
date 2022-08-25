/** @format */

import { Find } from "@repos/repo_types";

const findOne: Find<"list"> = async ({ id, ctx }) => {
  return await ctx.db.list.findUnique({ where: { id } });
};
export default findOne;
