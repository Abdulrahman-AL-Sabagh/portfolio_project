/** @format */

import LikeEntity from "@entities/post/Like";
import { Context, MockContext, createMockContext } from "@repos/prismaContext";
import LikeRepository from "@repos/LikeRepository";
import { postToAdd, userToAdd } from "../../test_data";



let mockCtx: MockContext;
let ctx: Context;
const likeData = {
  postId: postToAdd.id,
  userId: userToAdd.#id,
};
let likeMock: any;
let like: LikeEntity = new LikeEntity(likeData);

describe("Like Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    likeMock = mockCtx.prisma.like;
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);
    likeMock.create.mockResolvedValue(like);
    likeMock.delete.mockResolvedValue(like);
  });

  it("Should delete a like if it exists", async () => {
    likeMock.findUnique.mockResolvedValue(like);
    let deletedLike: LikeEntity | null = await LikeRepository.update(
      likeData,
      ctx
    );
    expect(deletedLike).toEqual(like);
    likeMock.findUnique.mockResolvedValue(null);
    const foundLike = await LikeRepository.findOne(likeData, ctx);
    expect(foundLike).toBe(null);
  });

  it("Should create a like if it not exists", async () => {
    likeMock.findUnique.mockResolvedValueOnce(null);

    const likeToAdd = await LikeRepository.update(likeData, ctx);
    expect(likeToAdd).toEqual(like);
    expect(mockCtx.prisma.like.create).toBeCalled();
  });

  it("Should return a like if it exists", async () => {
    likeMock.findUnique.mockResolvedValue(like);

    const foundLike = await LikeRepository.findOne(likeData, ctx);
    expect(foundLike).toEqual(like);
  });

  it("Should return null if a like does not exists", async () => {
    likeMock.findUnique.mockResolvedValue(null);

    const foundLike = await LikeRepository.findOne(likeData, ctx);
    expect(foundLike).toBe(null);
  });
});
