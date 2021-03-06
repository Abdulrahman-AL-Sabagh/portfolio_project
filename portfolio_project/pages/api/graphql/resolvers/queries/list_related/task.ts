/** @format */

import prisma from "../../../../../../lib/prisma";
import { Id } from "../../../types";
/** @format */

const task = {
  list: async ({ listId }: Id) => {
    return await prisma.list.findUnique({
      where: {  id:listId},
    });
  },
};
export default task;