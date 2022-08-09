/** @format */

import { Context, MockContext, createMockContext } from "@repos/prismaContext";
import BookmarkEntity from "@entities/post/Bookmark";
import { Bookmark } from "@prisma/client";
import BookmarkRepository from "@repos/BookmarkRepository";
import { postToAdd, userToAdd } from "test_data";

let mockCtx: MockContext;
let ctx: Context;
let mockBookmark: any;

const bookmarkData: Bookmark = { postId: postToAdd.id, userId: userToAdd.id };
const bookmarkToAdd = new BookmarkEntity(bookmarkData);

describe("Bookmark Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockBookmark = mockCtx.prisma.bookmark;
  });
  it("It should find a bookmark", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);

    mockBookmark.findUnique.mockResolvedValue(bookmarkToAdd);
    const bookmark = await BookmarkRepository.findOne(bookmarkData, ctx);
    expect(bookmark).toEqual(bookmarkToAdd);
  });

  it("Should create a bookmark if it not exists", async () => {
    mockBookmark.findUnique.mockResolvedValue(null);
    mockBookmark.create.mockResolvedValue(bookmarkToAdd);

    const bookmark = await BookmarkRepository.update(bookmarkData, ctx);
    expect(bookmark).toEqual(bookmarkToAdd);
  });
 
  it("Should delete a bookmark if it exists", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);
    mockBookmark.findUnique.mockResolvedValue(bookmarkToAdd);
    mockBookmark.delete.mockResolvedValue(bookmarkToAdd);
    const bookmark = await BookmarkRepository.update(bookmarkData, ctx);
    expect(bookmark).toEqual(bookmarkToAdd);
    mockBookmark.findUnique.mockResolvedValue(null);
    const foundBookmark = await BookmarkRepository.findOne(bookmarkData, ctx);
    expect(foundBookmark).toEqual(null);
  });
});
