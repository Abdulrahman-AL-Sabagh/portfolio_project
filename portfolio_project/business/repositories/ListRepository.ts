/** @format */

import { List } from "@prisma/client";
import ListEntity from "@entities/todolist/List";
import deleteOne from "./list/delete_one_list";
import  findOne  from "./list/find_one_list";
import update from "./list/update_list";
import create from "./list/create_list"
export const allListData = (list: List) => {
  try {
    const validList = new ListEntity(list);
    const { id, title, titleColor, userId, color } = validList;
    return { id, title, titleColor, userId, color };
  } catch (error) {
    throw error;
  }
};



const ListRepository = {
  create,
  findOne,
  update,
  deleteOne,
};
export default ListRepository;
