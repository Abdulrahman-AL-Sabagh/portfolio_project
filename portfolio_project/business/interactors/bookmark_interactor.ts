/** @format */

import BookmarkRepository from "@repos/bookmark_repository";
import { CreateOrUpdate, FindInteraction } from "@repos/repo_types";
import postInteractor from "./post_interactor";
import userInteractor from "./user_interactor";

const update: CreateOrUpdate<"bookmark"> = async ({ data, ctx }) => {
  const bookmarkExists = await findOneById({ data, ctx });
  if (!bookmarkExists) {
    return BookmarkRepository.create({ data, ctx });
  }
  return BookmarkRepository.deleteOne({ data, ctx });
};

const findOneById: FindInteraction<"bookmark"> = async ({
  data: { userId, postId },
  ctx,
}) => {
  await userInteractor.checkIfUserExists({ id: userId, ctx });
  await postInteractor.checkIfPostExists({ id: postId, ctx });

  return BookmarkRepository.findOne({ data: { userId, postId }, ctx });
};

const bookmarkInteractor = {
  update,
  findOneById,
};

export default bookmarkInteractor;
