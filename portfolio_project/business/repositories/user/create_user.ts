/** @format */
import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"user"> = ({ data, ctx }) => {
  return ctx.db.user.create({ data });
};

export default create;
