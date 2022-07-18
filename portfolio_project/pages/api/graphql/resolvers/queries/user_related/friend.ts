/** @format */

import { getUserById } from "../../../globalFunctions";
import { Id } from "../../../types";

const friend = {
  user: async ({ userId }: Id) => {
    return getUserById(userId);
  },
  friend: async ({ friendId }: Id) => {
    return getUserById(friendId);
  },
};

export default friend;
