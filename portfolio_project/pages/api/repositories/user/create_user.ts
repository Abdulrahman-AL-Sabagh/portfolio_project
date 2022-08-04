/** @format */

import { Context } from "./../prismaContext";
/** @format */

import { User } from "@prisma/client";
import UserEntity from "../../entities/User";
import { allUserData } from "../UserRepository";

const create = async (userData: User , ctx: Context): Promise<UserEntity> => {
  const emailExists: User | null = await ctx.prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (emailExists) {
    throw new Error("Email is taken");
  }

  try {
    const user = new UserEntity(userData);
    await ctx.prisma.user.create({
      data: allUserData(user),
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export default create;
