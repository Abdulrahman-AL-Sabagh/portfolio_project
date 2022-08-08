/** @format */

import { Like } from "@prisma/client";
import LikeEntity from "@entities/post/Like";
import { Context } from "./prismaContext";
import { checkIfUserAndPostExist } from "./helpers";


const update = async (
  likeData: Like,
  ctx: Context,
): Promise<LikeEntity> => {
  let like: Like;

  const foundLike = await findOne(likeData, ctx);
  if (!foundLike) {
    like = await ctx.prisma.like.create({ data: likeData });
  } else {
    like = await ctx.prisma.like.delete({ where: likeData });
  }
  return new LikeEntity(like);
};

const findOne = async (
  likeData: { userId: string; postId: string },
  ctx: Context
): Promise<Like | null> => {
  try {
    const { userId, postId } = likeData;
    await checkIfUserAndPostExist(userId, postId, ctx);
    const like = await ctx.prisma.like.findUnique({ where: likeData });
    if (!like) {
      return null;
    }
    return new LikeEntity(like);
  } catch (error) {
    throw error;
  }
};

const LikeRepository = {
  update,
  findOne,
};
export default LikeRepository;
