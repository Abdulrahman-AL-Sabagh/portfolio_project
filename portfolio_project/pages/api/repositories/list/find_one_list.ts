/** @format */

import { vId } from "@lib/validators";
import ListEntity from "@entities/todolist/List";
import { Context } from "../prismaContext";

const findOne = async (
  id: string,
  ctx: Context
): Promise<ListEntity | null> => {
  try {
    vId.parse(id);
    const list = await ctx.prisma.list.findUnique({ where: { id } });
    if (!list) return null;
    return new ListEntity(list);
  } catch (error) {
    throw error;
  }
};
export default findOne;
