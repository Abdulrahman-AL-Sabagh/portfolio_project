/** @format */

import CommentEntity from "@entities/post/PostComment";
import { Comment } from "@prisma/client";
import findOne from "./comment/find_one_comment";
import create from "./comment/create_comment";
import update from "./comment/update_comment";
import deleteOne from "./comment/delete_comment";


const CommentRepository = {
  create,
  findOne,
  update,
  deleteOne,
};

export default CommentRepository;
