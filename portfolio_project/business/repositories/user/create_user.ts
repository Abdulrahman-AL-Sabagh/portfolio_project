/** @format */
import { CreateOrUpdate } from "@repos/repo_types";

const create: CreateOrUpdate<"user"> = ({ data, ctx }) => {
  return ctx.prisma.user.create({ data });
};

export default create;
