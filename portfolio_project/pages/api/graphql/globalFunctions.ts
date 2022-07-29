/** @format */

import prisma from "../../../lib/prisma";

export async function getUserById(userId: number) {
  console.log(userId);
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
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
  });
}
export async function getPostById(postId: number) {
  return await prisma.post.findUnique({
    where: { id: postId },
  });
}
