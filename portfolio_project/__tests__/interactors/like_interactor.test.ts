/** @format */

import { Context, MockContext, createMockContext } from "@repos/prismaContext";
import likeInteractor from "@interactors/like_interactor";
import { postData, userData } from "../../test_data";
import { InteractionParams } from "@repos/repo_types";

let mockCtx: MockContext;
let ctx: Context;
const data = {
  postId: postData.data.id,
  userId: userData.data.id,
};
let likeMock: any;
let handlerParams: InteractionParams;
describe("Like Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    likeMock = mockCtx.db.like;
    mockCtx.db.user.findUnique.mockResolvedValue(userData.data);
    mockCtx.db.post.findUnique.mockResolvedValue(postData.data);
    likeMock.create.mockResolvedValue(data);
    likeMock.delete.mockResolvedValue(data);
    handlerParams = { data, ctx };
  });

  it("Should delete a like if it exists", async () => {
    likeMock.findUnique.mockResolvedValue(data);
    const like = await likeInteractor.update(handlerParams);
    expect(like.data).toEqual(data);
    likeMock.findUnique.mockResolvedValue(null);
    const foundLike = await likeInteractor.findOneById(handlerParams);
    expect(foundLike.data).toBe(null);
  });

  it("Should create a like if it not exists", async () => {
    likeMock.findUnique.mockResolvedValueOnce(null);

    const like = await likeInteractor.update(handlerParams);
    expect(like.data).toEqual(data);
  });

  it("Should return a like if it exists", async () => {
    likeMock.findUnique.mockResolvedValue(data);
    const like = await likeInteractor.findOneById(handlerParams);
    expect(like.data).toEqual(data);
  });

  it("Should return null if a like does not exists", async () => {
    likeMock.findUnique.mockResolvedValue(null);
    const like = await likeInteractor.findOneById(handlerParams);
    expect(like.data).toBe(null);
  });
  
});
