/** @format */

import PostRepository from "@repos/PostRepository";
import { MockContext, Context, createMockContext } from "@repos/prismaContext";
import { userToAdd, postToAdd } from "../../test_data";

let mockCtx: MockContext;
let ctx: Context;
describe("Post repository", () => {
  beforeAll(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });
  it("Should create a post", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockCtx.prisma.post.create.mockResolvedValue(postToAdd);
    const post = await PostRepository.create(postToAdd, userToAdd.id, ctx);
    expect(ctx.prisma.user.findUnique).toHaveBeenCalled();

    expect(post).toEqual(postToAdd);
  });
  it("Should find the post using the provided id", async () => {
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);
    const post = await PostRepository.findOne(postToAdd.id, ctx);

    expect(post).toEqual(postToAdd);
  });
  it("Should update a post if it exist", async () => {
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);

    const postToUpdate = postToAdd;
    postToUpdate.title = "I AM A PRO!";
    mockCtx.prisma.post.update.mockResolvedValue(postToUpdate);
    const post = await PostRepository.update(postToUpdate, ctx);
    expect(ctx.prisma.post.findUnique).toHaveBeenCalled();
    expect(post).toEqual(postToUpdate);
  });
  it("Should delete a post if it exist", async () => {
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);
    mockCtx.prisma.post.delete.mockResolvedValue(postToAdd);

    const post = await PostRepository.deleteOne(postToAdd.id, ctx);
    expect(ctx.prisma.post.findUnique).toHaveBeenCalled();
    expect(post).toEqual(postToAdd);
    mockCtx.prisma.post.findUnique.mockResolvedValue(null);
    const foundPost = await PostRepository.findOne(postToAdd.id, ctx);
    expect(foundPost).toBeNull();
  });
});
