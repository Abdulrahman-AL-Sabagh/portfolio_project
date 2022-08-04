/** @format */

import { User } from "@prisma/client";
import UserEntity from "../../entities/User";
import { UserRepoFunctions } from "../repo-types";
import { allUserData } from "../UserRepository";



const create = async (
  userData: User,
  prisma: UserRepoFunctions
): Promise<UserEntity> => {
  const emailExists: User | null = await prisma.findUnique({
    where: { email: userData.email },
  });
  if (emailExists) {
    throw new Error("Email is taken");
  }

  try {
    const user = new UserEntity(userData);
    await prisma.create({
      data: allUserData(user),
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export default create;
