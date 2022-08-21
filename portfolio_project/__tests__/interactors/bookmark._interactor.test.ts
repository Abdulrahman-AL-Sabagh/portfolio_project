/** @format */

import { Context, MockContext, createMockContext } from "@repos/prismaContext";
import { postData, userData } from "test_data";
import bookmarkInteractor from "@interactors/bookmark_interactor";
import { InteractionParams } from "@repos/repo_types";

let mockCtx: MockContext;
let ctx: Context;
let mockBookmark: any;

const data = { postId: postData.data.id, userId: userData.data.id };

let handlerParams: InteractionParams;
describe("Bookmark Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockBookmark = mockCtx.db.bookmark;
    handlerParams = { data, ctx };
    mockCtx.db.user.findUnique.mockResolvedValue(userData.data);
    mockCtx.db.post.findUnique.mockResolvedValue(postData.data);
  });
  it("It should find a bookmark", async () => {
    mockBookmark.findUnique.mockResolvedValue(data);
    const bookmark = await bookmarkInteractor.findOneById(handlerParams);
    expect(bookmark.data).toEqual(data);
  });

  it("Should create a bookmark if it not exists", async () => {
    mockBookmark.findUnique.mockResolvedValue(null);
    mockBookmark.create.mockResolvedValue(data);

    const bookmark = await bookmarkInteractor.update(handlerParams);
    expect(bookmark.data).toEqual(data);
  });

  it("Should delete a bookmark if it exists", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData.data);
    mockCtx.db.post.findUnique.mockResolvedValue(postData.data);

    mockBookmark.findUnique.mockResolvedValue(data);
    mockBookmark.delete.mockResolvedValue(data);
    const bookmark = await bookmarkInteractor.update(handlerParams);
    expect(bookmark.data).toEqual(data);
    mockBookmark.findUnique.mockResolvedValue(null);
    const foundBookmark = await bookmarkInteractor.findOneById(handlerParams);
    expect(foundBookmark.data).toEqual(null);
  });
});
