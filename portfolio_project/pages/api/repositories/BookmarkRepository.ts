/** @format */

import { Bookmark } from "@prisma/client";
import BookmarkEntity from "@entities/post/Bookmark";
import { Context } from "./prismaContext";
import { checkIfUserAndPostExist } from "./helpers";

const updateBookmark = async (
  bookmarkData: Bookmark,
  ctx: Context
): Promise<BookmarkEntity> => {
  const { userId, postId } = bookmarkData;
  await checkIfUserAndPostExist(userId, postId, ctx);

  let bookmark;
  const foundBookmark = ctx.prisma.bookmark.findUnique({ where: bookmarkData });

  if (!foundBookmark) {
    bookmark = await ctx.prisma.bookmark.create({ data: bookmarkData });
  } else {
    bookmark = await ctx.prisma.bookmark.delete({ where: bookmarkData });
  }

  return new BookmarkEntity(bookmark);
};
