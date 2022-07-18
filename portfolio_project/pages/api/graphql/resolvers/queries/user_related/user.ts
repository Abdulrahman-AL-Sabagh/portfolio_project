/** @format */

import prisma from "../../../../../../lib/prisma";

import { Id } from "../../../types";
const user = {
  posts: async ({ id }: Id) => {
    return await prisma.post.findMany({
      where: {
        userId: id,
      },
    });
  },
  friends: async ({ id }: Id) => {
    return await prisma.userFriend.findMany({
      where: {
        userId: id,
      },
    });
  },
  bookmarks: async ({ id }: Id) => {
    return await prisma.bookmarkedPost.findMany({
      where: { userId: id },
    });
  },
  likes: async ({ id }: Id) => {
    return await prisma.likedPost.findMany({
      where: { userId: id },
    });
  },
  lists: async ({ id }: Id) => {
    return await prisma.list.findMany({
      where: { userId: id },
    });
  },
};

export default user;
