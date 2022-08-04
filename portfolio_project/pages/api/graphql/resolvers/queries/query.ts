/** @format */
import prisma from "../../../../../prisma";
import { Id } from "../../types";
const queryResolver = {
  hello: async () => "hello",
  users: async () => {
    return await prisma.user.findMany();
  },
  user: async (_: any, { id }: Id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
  posts: async () => {
    return await prisma.post.findMany();
  },
  post: async (_: any, { id }: Id) => {
    return await prisma.post.findUnique({
      where: { id },
    });
  },
};

export default queryResolver;
