import List from "@entities/todolist/List";
import ListEntity from "@entities/todolist/List";
import {Context} from "@repos/prismaContext"
import {allListData} from "@repos/ListRepository";
import findOne from "./find_one_list";
 const update = async (
    listData: List,
    ctx: Context
  ): Promise<ListEntity> => {
    const listExists = await findOne(listData.id, ctx);
    if (!listExists) throw new Error("List not found");
    const list = await ctx.prisma.list.update({
      where: { id: listData.id },
      data: allListData(listData),
    });
    return new ListEntity(list);
  };

  export default update