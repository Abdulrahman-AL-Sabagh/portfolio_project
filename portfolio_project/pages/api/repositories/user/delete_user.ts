/** @format */

import UserEntity from "../../entities/User";
import { UserRepoFunctions } from "../repo-types";
import findOne from "./find_one_user";
import prisma from "../../../../lib/prisma";
import { Prisma, User } from "@prisma/client";


const deleteOne = async (
  id: string,
  prisma: UserRepoFunctions
): Promise<UserEntity> => {
  const user: UserEntity | null = await findOne(id, prisma);
  if (!user) {
    throw new Error("User does not exist");
  }

  const deletedUser = await prisma.delete({
    where: { id },
  });
  if (!deletedUser) {
    console.log(id, deletedUser)
    throw new Error("Something wrong happend")
  }
  return new UserEntity(deletedUser);

};
export default deleteOne;
