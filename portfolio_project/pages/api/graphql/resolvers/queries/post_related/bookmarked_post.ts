/** @format */

import { getPostById, getUserById } from "../../../globalFunctions";
import { Id } from "../../../types";

const bookmarkedPost = {
  user: async ({ userId }: Id) => {
    return await getUserById(userId);
  },
  post: async ({ postId }: Id) => {
    return await getPostById(postId);
  },
};
export default bookmarkedPost;
