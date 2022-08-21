/** @format */

import { Find } from "@repos/repo_types";

const findOneById: Find<"post"> =async  ({ id, ctx }) => {
  return { data: await ctx.db.post.findUnique({ where: { id } })};
};

export default findOneById;
