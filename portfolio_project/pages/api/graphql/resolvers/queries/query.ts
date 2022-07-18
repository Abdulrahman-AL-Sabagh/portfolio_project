/** @format */
import prisma from "../../../../../lib/prisma";
import { Id } from "../../types";
const queryResolver = {
  users: async () => {
    return await prisma.user.findMany();
  },
  user: async (_: any, { id }: Id, context: any) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
  posts: async () => {
    return await prisma.post.findMany();
  },
  likedPosts: async () => {
    return await prisma.likedPost.findMany();
  },
};

export default queryResolver