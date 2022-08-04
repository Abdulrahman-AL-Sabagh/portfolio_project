/** @format */

import prisma from "../../../../../../prisma";
import { getUserById } from "../../../globalFunctions";
import { Id } from "../../../types";

const friend = {
  user: async ({ userId }: Id) => {
    if (userId === undefined) {
      console.log(userId);
      return
    }
    return await getUserById(userId);
  },
  friend: async ({ friendId }: Id) => {
    return await getUserById(friendId);
  },
  
};

export default friend;
