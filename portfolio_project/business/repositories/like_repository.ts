/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  FindInteraction,
  FindMany,
} from "./repo_types";

const create: CreateOrUpdate<"like"> = async ({ data, ctx }) => {
  return await ctx.prisma.like.create({ data });
};

const findOne: FindInteraction<"like"> = async ({ userId, postId, ctx }) => {
  return await ctx.prisma.like.findUnique({ where: { userId, postId } });
};

const findManyByUserId: FindMany<"like"> = ({ id, ctx }) => {
  return ctx.prisma.like.findMany({
    where: { userId: id },
  });
};

const findManyByPostId: FindMany<"like"> = ({ id, ctx }) => {
  return ctx.prisma.like.findMany({
    where: { postId: id },
  });
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
  findManyByPostId,
  findManyByUserId,
};
export default LikeRepository;
