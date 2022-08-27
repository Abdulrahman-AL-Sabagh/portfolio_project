/** @format */

import commentInteractor from "@interactors/comment_interactor";
import { commentNotFound } from "@interactors/errors";
import toDomainValueParser from "business/parsers/parse_to_domain";
import { CommentArgs, IdArgs, DBContext } from "./resolver_types";

const { domainComment, domainFullComment } = toDomainValueParser;
const { create, update, deleteOne, findOneById } = commentInteractor;
const addComment = async (
  parent: never,
  args: CommentArgs,
  { db }: DBContext
) => {
  const data = domainFullComment(args.comment);
  return await create({ data, ctx: db });
};

const updateComment = async (
  parent: never,
  args: CommentArgs,
  { db }: DBContext
) => {
  const comment = await findOneById({ ctx: db, id: args.comment.id });
  if (!comment) throw commentNotFound;
  const argsData = domainComment(args.comment);
  (Object.keys(argsData) as (keyof typeof argsData)[]).forEach(
    //@ts-ignore
    (k) => (comment[k] = argsData[k])
  );
  return await update({ data: comment, ctx: db });
};

const deleteComment = async (
  parent: never,
  args: IdArgs,
  { db }: DBContext
) => {
  return await deleteOne({ id: args.id, ctx: db });
};

const commentMutations = {
  addComment,
  updateComment,
  deleteComment,
};
export default commentMutations;
