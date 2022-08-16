/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  FindInteraction,
} from "./repo_types";

const create: CreateOrUpdate<"like"> = async ({ data, ctx }) => {
  return await ctx.prisma.like.create({ data });
};

const findOne: FindInteraction<"like"> = async ({ userId, postId, ctx }) => {
  return await ctx.prisma.like.findUnique({ where: { userId, postId } });
};

const deleteOne: DeleteInteraction<"like"> = async ({
  userId,
  postId,
  ctx,
}) => {
  return await ctx.prisma.like.delete({ where: { userId, postId } });
};

const LikeRepository = {
  create,
  deleteOne,
  findOne,
};
export default LikeRepository;
