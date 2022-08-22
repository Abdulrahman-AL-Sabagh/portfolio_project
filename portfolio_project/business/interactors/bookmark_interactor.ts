/** @format */

import BookmarkRepository from "@repos/bookmark_repository";
import { CreateOrUpdate, FindInteraction } from "@repos/repo_types";
import { UserOrPostNotFound } from "./errors";
import { checkIfUserAndPostExists } from "./helpers";

const update: CreateOrUpdate<"bookmark"> = async (data) => {
  const bookmarkExists = await findOneById(data);
  if (!bookmarkExists) {
    return await BookmarkRepository.create(data);
  }
  return await BookmarkRepository.deleteOne(data);
};

const findOneById: FindInteraction<"bookmark"> = async (data) => {
  const userAndPostExists = await checkIfUserAndPostExists(data);
  if (!userAndPostExists) throw UserOrPostNotFound;
  return await BookmarkRepository.findOne(data);
};

const bookmarkInteractor = {
  update,
  findOneById,
};

export default bookmarkInteractor;
