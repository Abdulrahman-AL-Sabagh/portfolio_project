/** @format */

import { Bookmark } from "@prisma/client";
import BookmarkEntity from "@entities/post/Bookmark";
import { Context } from "./prismaContext";
import { checkIfUserAndPostExist } from "./helpers";

const update = async (
  data: Bookmark,
  ctx: Context
): Promise<BookmarkEntity> => {
  
  let bookmark;
  const foundBookmark = await ctx.prisma.bookmark.findUnique({ where: data });

  if (!foundBookmark) {
    bookmark = await ctx.prisma.bookmark.create({ data });
  } else {
    bookmark = await ctx.prisma.bookmark.delete({ where: data });
  }

  return new BookmarkEntity(bookmark);
};

const findOne = async (data:Bookmark, ctx: Context) => {
  try {
    const {userId,postId} = data;
    await checkIfUserAndPostExist(userId,postId,ctx)
    const bookmark = await ctx.prisma.bookmark.findUnique({where: data})   
    if(!bookmark) return null;
    return new BookmarkEntity(bookmark) 
  } catch (error) {
    throw error;
  }
};
const BookmarkRepository= {
  findOne,
  update
}
export default BookmarkRepository