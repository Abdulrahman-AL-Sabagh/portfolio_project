import ListEntity from "@entities/todolist/List";
import { Context } from "../prismaContext";
import  findOne  from "./find_one_list";

 const deleteOne = async (
    id: string,
    ctx: Context
  ): Promise<ListEntity> => {
    const listExists = await findOne(id, ctx);
    if (!listExists) throw new Error("List not found");
    const list = await ctx.prisma.list.delete({ where: { id } });
    return new ListEntity(list);
  };
  
  export default deleteOne;