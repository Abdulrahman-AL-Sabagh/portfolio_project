/** @format */

import { UserRepoFunctions } from "./../repo-types.d";

const findMany = async (prisma: UserRepoFunctions) => {
  return await prisma.findMany();
};

export default findMany;
