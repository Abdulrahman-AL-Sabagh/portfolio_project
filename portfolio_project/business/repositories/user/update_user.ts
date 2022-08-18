/** @format */

import { CreateOrUpdate } from "@repos/repo_types";
import { User } from "@prisma/client";

const update: CreateOrUpdate<"user"> = ({ data, ctx }): Promise<User> => {
  return ctx.db.user.update({
    data,
    where: { id: data.id },
  });
};

export default update;
