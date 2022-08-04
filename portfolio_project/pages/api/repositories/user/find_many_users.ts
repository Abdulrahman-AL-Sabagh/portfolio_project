/** @format */

import { UserDelegate } from "./../repo-types.d";

const findMany = async (prisma: UserDelegate) => {
  return await prisma.findMany();
};

export default findMany;
