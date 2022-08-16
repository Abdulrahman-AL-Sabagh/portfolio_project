/** @format */

import { Post } from "@prisma/client";
import PostEntity from "@entities/post/Post";
import create from "./post/create_post";
import findOneById from "./post/find_one_post";
import update from "./post/update_post";
import deleteOne from "./post/delete_post";



const PostRepository = {
  create,
  findOneById,
  update,
  deleteOne,
};
export default PostRepository;
