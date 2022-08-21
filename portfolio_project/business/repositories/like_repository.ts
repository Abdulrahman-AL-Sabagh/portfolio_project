/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  FindInteraction,
  FindMany,
} from "./repo_types";

const create: CreateOrUpdate<"like"> = async ({ data, ctx }) => {
  return { data: await ctx.db.like.create({ data }) };
};

const findOne: FindInteraction<"like"> = async ({ data, ctx }) => {
  return {
    data: await ctx.db.like.findUnique({ where: { ...data } }),
  };
};

const findManyByUserId: FindMany<"like"> = async ({ id, ctx }) => {
  return {
    data: await ctx.db.like.findMany({
      where: { userId: id },
    }),
  };
};

const findManyByPostId: FindMany<"like"> = async ({ id, ctx }) => {
  return {
    data: await ctx.db.like.findMany({
      where: { postId: id },
    }),
  };
};

const deleteOne: DeleteInteraction<"like"> = async ({ data, ctx }) => {
  return {
    data: await ctx.db.like.delete({ where: { ...data } }),
  };
};

const LikeRepository = {
  create,
  deleteOne,
  findOne,
  findManyByPostId,
  findManyByUserId,
};
export default LikeRepository;
