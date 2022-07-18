/** @format */

import prisma from "../../../lib/prisma";

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    select: { id: true, name: true },
    where: { id: userId },
  });
}
export async function getPostById(postId: number) {
  return await prisma.post.findUnique({
    where: { id: postId },
  });
}
