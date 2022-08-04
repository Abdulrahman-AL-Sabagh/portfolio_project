/** @format */

import { Context } from "./../prismaContext";
import { User } from "@prisma/client";
import UserEntity from "../../entities/User";
import { allUserData } from "../UserRepository";
import findOne from "./find_one_user";

const update = async (user: User, ctx: Context): Promise<UserEntity> => {
  const userExists = await findOne(user.id, ctx);
  if (!userExists) {
    throw new Error("User does not exists");
  }
  const updatedUser = await ctx.prisma.user.update({
    data: allUserData(user),
    where: { id: user.id },
  });
  return new UserEntity(updatedUser);
};

export default update;
