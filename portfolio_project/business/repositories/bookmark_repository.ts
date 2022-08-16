/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  FindInteraction,
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
const BookmarkRepository = {
  findOne,
  deleteOne,
  create,
};
export default BookmarkRepository;
