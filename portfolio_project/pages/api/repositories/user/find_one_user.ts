/** @format */

import { vId } from "../../../../lib/validators";
import UserEntity from "../../entities/User";
import { Context } from "../prismaContext";

const findOne = async (
  id: string,
  ctx: Context
): Promise<UserEntity | null> => {
  try {
    vId.parse(id);
  } catch (error) {
    throw error;
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id },
  });
  if (!user) return null;
  return new UserEntity(user);
};

export default findOne;
