/** @format */

import { List } from "@prisma/client";
import ListEntity from "@entities/todolist/List";
import { allListData } from "../ListRepository";
import { Context } from "../prismaContext";
import UserRepository from "../UserRepository";

const create = async (listData: List, ctx: Context): Promise<ListEntity> => {
  const userExists = UserRepository.findOne(listData.id, ctx);
  if (!userExists) throw new Error("User not found");
  const list = await ctx.prisma.list.create({ data: allListData(listData) });
  return new ListEntity(list);
};

export default create;
