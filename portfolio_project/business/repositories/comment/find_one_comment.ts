/** @format */

import { Find } from "@repos/repo_types";

const findOneById: Find<"comment"> = async({ id, ctx }) => {
  return { data: await ctx.db.comment.findUnique({ where: { id } }) };
};

export default findOneById;
