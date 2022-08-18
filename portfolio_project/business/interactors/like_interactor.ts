/** @format */

import LikeRepository from "@repos/like_repository";
import { CreateOrUpdate, FindInteraction } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";

const update: CreateOrUpdate<"like"> = async ({ data, ctx }) => {
  const likeExists = await findOneById({ data, ctx });
  if (!likeExists) {
    return await LikeRepository.create({ data, ctx });
  }
  return await LikeRepository.deleteOne({ data, ctx });
};
const findOneById: FindInteraction<"like"> = async ({
  data: { userId, postId },
  ctx,
}) => {
  await userInteractor.checkIfUserExists({ id: userId, ctx });
  await postInteractor.checkIfPostExists({ id: postId, ctx });

  return await LikeRepository.findOne({ data: { userId, postId }, ctx });
};
const likeInteractor = {
  update,
  findOneById,
};
export default likeInteractor
