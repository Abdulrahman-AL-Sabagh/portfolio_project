/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  Find,
  FindInteraction,
  FindMany,
} from "./repo_types";
const create: CreateOrUpdate<"bookmark"> = async ({ data, ctx }) => {
  return await ctx.prisma.bookmark.create({ data });
};
const deleteOne: DeleteInteraction<"bookmark"> = async ({
  userId,
  postId,
  ctx,
}) => {
  return await ctx.prisma.bookmark.delete({ where: { userId, postId } });
};
const findOne: FindInteraction<"bookmark"> = async ({
  userId,
  postId,
  ctx,
}) => {
  return await ctx.prisma.bookmark.findUnique({ where: { userId, postId } });
};

const findMnayByUserId: FindMany<"bookmark"> = ({ id, ctx }) => {
  return ctx.prisma.bookmark.findMany({
    where: { userId: id },
  });
};
const findMnayByPostId: FindMany<"bookmark"> = ({ id, ctx }) => {
  return ctx.prisma.bookmark.findMany({
    where: { postId: id },
  });
};
const BookmarkRepository = {
  findOne,
  deleteOne,
  create,
};
export default BookmarkRepository;
