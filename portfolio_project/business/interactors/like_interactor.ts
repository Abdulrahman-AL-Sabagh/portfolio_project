/** @format */

import LikeRepository from "@repos/LikeRepository";
import { CreateOrUpdate, FindInteraction } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";

const update: CreateOrUpdate<"like"> = async ({
  data: { userId, postId },
  ctx,
}) => {
  const postExists = findOneById({ userId, postId, ctx });
  if (!postExists) {
    return await LikeRepository.create({ data: { userId, postId }, ctx });
  }
  return await LikeRepository.deleteOne({ userId, postId, ctx });
};
const findOneById: FindInteraction<"like"> = async ({
  userId,
  postId,
  ctx,
}) => {
  const userExists = userInteractor.findOneById({ id: userId, ctx });
  if (!userExists) throw userInteractor.errors.userNotFound;
  const postExists = postInteractor.findOneById({ id: postId, ctx });
  if (!postExists) throw postInteractor.errors.postNotFound;

  return await LikeRepository.findOne({ userId, postId, ctx });
};
