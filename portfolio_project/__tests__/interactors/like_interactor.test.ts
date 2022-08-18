/** @format */

import LikeEntity from "@entities/post/Like";
import { Context, MockContext, createMockContext } from "@repos/prismaContext";
import likeInteractor from "@interactors/like_interactor";
import { postData, userData } from "../../test_data";
import { InteractionParams } from "@repos/repo_types";

let mockCtx: MockContext;
let ctx: Context;
const data = {
  postId: postData.id,
  userId: userData.id,
};
let likeMock: any;
let handlerParams: InteractionParams;
describe("Like Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    likeMock = mockCtx.db.like;
    mockCtx.db.user.findUnique.mockResolvedValue(userData);
    mockCtx.db.post.findUnique.mockResolvedValue(postData);
    likeMock.create.mockResolvedValue(data);
    likeMock.delete.mockResolvedValue(data);
    handlerParams = { data, ctx };
  });

  it("Should delete a like if it exists", async () => {
    likeMock.findUnique.mockResolvedValue(data);
    let deletedLike = await likeInteractor.update(handlerParams);
    expect(deletedLike).toEqual(data);
    likeMock.findUnique.mockResolvedValue(null);
    const foundLike = await likeInteractor.findOneById(handlerParams);
    expect(foundLike).toBe(null);
  });

  it("Should create a like if it not exists", async () => {
    likeMock.findUnique.mockResolvedValueOnce(null);

    const likeToAdd = await likeInteractor.update(handlerParams);
    expect(likeToAdd).toEqual(data);
    expect(mockCtx.db.like.create).toBeCalled();
  });

  it("Should return a like if it exists", async () => {
    likeMock.findUnique.mockResolvedValue(data);

    const foundLike = await likeInteractor.findOneById(handlerParams);
    expect(foundLike).toEqual(data);
  });

  it("Should return null if a like does not exists", async () => {
    likeMock.findUnique.mockResolvedValue(null);

    const foundLike = await likeInteractor.findOneById(handlerParams);
    expect(foundLike).toBe(null);
  });
});
