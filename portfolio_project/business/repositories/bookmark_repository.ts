/** @format */

import {
  CreateOrUpdate,
  DeleteInteraction,
  FindInteraction,
  FindMany,
} from "./repo_types";
const create: CreateOrUpdate<"bookmark"> = ({ data, ctx }) => {
  return ctx.db.bookmark.create({ data });
};
const deleteOne: DeleteInteraction<"bookmark"> = ({ data, ctx }) => {
  return ctx.db.bookmark.delete({ where: { ...data } });
};
const findOne: FindInteraction<"bookmark"> = ({ data, ctx }) => {
  return ctx.db.bookmark.findUnique({ where: { ...data } });
};

const findManyByUserId: FindMany<"bookmark"> = ({ id, ctx }) => {
  return ctx.db.bookmark.findMany({
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
