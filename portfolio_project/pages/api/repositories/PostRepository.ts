/** @format */

import { Post } from "@prisma/client";
import PostEntity from "@entities/post/Post";
import create from "./post/create_post";
import findOne from "./post/find_one_post";
import update from "./post/update_post";
import deleteOne from "./post/delete_post";


export const allPostData = (postData: Post) => {
  try {
    const validatedPostData = new PostEntity(postData);

    return {
      id: validatedPostData.id,
      title: validatedPostData.title,
      description: validatedPostData.description,
      image: validatedPostData.image,
      publishedAt: validatedPostData.publishedAt,
      userId: validatedPostData.userId,
    };
  } catch (error) {
    throw error;
  }
};



const PostRepository = {
  create,
  findOne,
  update,
  deleteOne,
};
export default PostRepository;
