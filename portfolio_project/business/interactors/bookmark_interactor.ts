/** @format */

import BookmarkRepository from "@repos/BookmarkRepository";
import { CreateOrUpdate, FindInteraction } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";

const update: CreateOrUpdate<"bookmark"> = async ({
  data: { userId, postId },
  ctx,
}) => {
  const bookmarkExists = findOneById({ userId, postId, ctx });
  if (!bookmarkExists) {
    return BookmarkRepository.create({ data: { userId, postId }, ctx });
  }
  return BookmarkRepository.deleteOne({ userId, postId, ctx });
};

const findOneById: FindInteraction<"bookmark"> = async ({
  userId,
  postId,
  ctx,
}) => {
  const userExists = userInteractor.findOneById({ id: userId, ctx });
  const postExists = postInteractor.findOneById({ id: postId, ctx });
  if (!userExists) throw userInteractor.errors.userNotFound;
  if (!postExists) throw postInteractor.errors.postNotFound;

  return BookmarkRepository.findOne({ userId, postId, ctx });
};

const bookmarkInteractor = {
  update,
  findOneById,
};

export default bookmarkInteractor;
