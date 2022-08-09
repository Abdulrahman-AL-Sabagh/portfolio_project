/** @format */

import UserEntity from "@entities/User";
import findOne from "./find_one_user";
import { Context } from "../prismaContext";

const deleteOne = async (id: string, ctx: Context): Promise<UserEntity> => {
  const user: UserEntity | null = await findOne(id, ctx);
  if (!user) {
    throw new Error("User does not exist");
  }

  const deletedUser = await ctx.prisma.user.delete({
    where: { id },
  });

  return new UserEntity(deletedUser);
};
export default deleteOne;
