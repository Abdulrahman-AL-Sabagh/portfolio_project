/** @format */

import prisma from "../../../../../../lib/prisma";
import { Id } from "../../../types";

const post = {
  comments: ({ id }: Id) => {
    return prisma.comment.findMany({ where: { postId: id } });
  },
  publishedBy: ({ id }: Id) => {
    return prisma.user.findUnique({
      select: { name: true, avatar: true },
      where: { id },
    });
  },
  likes: ({ id }: Id) => {
    return prisma.likedPost.findMany({
      where: { postId: id },
    });
    
  },
};

export default post;
//TODO maybe a bookmark resolver 