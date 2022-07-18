/** @format */

import prisma from "../../../../../../lib/prisma";
import { Id } from "../../../types";

const list = {
  user: async ({ userId }: Id) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },
  tasks: async ({ id }: Id) => {
    return await prisma.task.findMany({
      where: { listId: id },
    });
  },
};
export default list;
