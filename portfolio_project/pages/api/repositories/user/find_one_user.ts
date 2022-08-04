/** @format */

import { vId } from "../../../../lib/validators";
import UserEntity from "../../entities/User";
import { UserRepoFunctions } from "../repo-types";

const findOne = async (
  id: string,
  prisma: UserRepoFunctions
): Promise<UserEntity | null> => {
  try {
    vId.parse(id);
  } catch (error) {
    throw error;
  }

  const user = await prisma.findUnique({
    where: { id },
  });
  if (!user) return null;
  return new UserEntity(user);
};

export default findOne;
