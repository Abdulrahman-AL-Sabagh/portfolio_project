/** @format */

import { postNotFound } from "@interactors/errors";
import postInteractor from "@interactors/post_interactor";
import toDomainValueParser from "business/parsers/parse_to_domain";
import { DBContext, IdArgs, PostArgs } from "./resolver_types";

const { domainPost, domainFullPost } = toDomainValueParser;
const { update, findOneById, deleteOne, create } = postInteractor;
const addPost = async (parent: unknown, args: PostArgs, { db }: DBContext) => {
  const data = domainFullPost(args.post);
  return await create({ data, ctx: db });
};

const updatePost = async (
  parent: unknown,
  args: PostArgs,
  { db }: DBContext
) => {
  const post = await findOneById({ id: args.post.id, ctx: db });
  if (!post) throw postNotFound;
  const argsData = domainPost(args.post);
  (Object.keys(argsData) as (keyof typeof argsData)[]).forEach(
    // @ts-ignore
    (k) => (post[k] = argsData[k])
  );
  return await update({ data: post, ctx: db });
};

const deletePost = async (parent: unknown, args: IdArgs, { db }: DBContext) => {
  return await deleteOne({ id: args.id, ctx: db });
};

const postMutations = {
  addPost,
  updatePost,
  deletePost,
};
export default postMutations;
