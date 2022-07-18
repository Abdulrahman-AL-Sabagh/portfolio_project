import { getPostById, getUserById } from "../../../globalFunctions";
import { Id } from "../../../types";

const likedPost =  {
    user: async ({ userId }: Id) => {
      return await getUserById(userId);
    },
    post: async ({ postId }: Id) => {
      return await getPostById(postId);
    },
}
export default likedPost