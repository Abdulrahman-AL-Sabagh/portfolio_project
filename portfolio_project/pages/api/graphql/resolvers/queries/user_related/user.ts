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
    console.log(id)
    const friends = await prisma.userFriend.findMany({
      select: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            aboutUser: true,
            avatar: true,
            job: true,
            location: true,
            gender: true,
            dateOfBirth: true,
            profileBackground: true,
          },
        },
      },
      where: { userId: id },
    });
    console.log(friends)
    return friends
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
