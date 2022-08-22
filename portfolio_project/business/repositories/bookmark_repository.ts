/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  FindInteraction,
  FindMany,
} from "./repo_types";
const create: CreateOrUpdate<"bookmark"> = async ({ data, ctx }) => {
  return await ctx.db.bookmark.create({ data });
};
const deleteOne: DeleteInteraction<"bookmark"> = async ({ data, ctx }) => {
  return await ctx.db.bookmark.delete({ where: { ...data } });
};
const findOne: FindInteraction<"bookmark"> = async ({ data, ctx }) => {
  return await ctx.db.bookmark.findUnique({ where: { ...data } });
};

const findManyByUserId: FindMany<"bookmark"> = async ({ id, ctx }) => {
  return await ctx.db.bookmark.findMany({
    where: { userId: id },
  });
};

const BookmarkRepository = {
  findOne,
  deleteOne,
  create,
  findManyByUserId,
};
export default BookmarkRepository;
