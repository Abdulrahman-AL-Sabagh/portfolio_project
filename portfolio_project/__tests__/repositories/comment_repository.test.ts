/** @format */

import { postToAdd, userToAdd } from "../../test_data";
import {
  Context,
  createMockContext,
  MockContext,
} from "../../pages/api/repositories/prismaContext";
import CommentRepository from "../../pages/api/repositories/CommentRepository";
import CommentEntity from "../../pages/api/entities/post/PostComment";
import { v4 } from "uuid";
let mockCtx: MockContext;
let ctx: Context;

const commentParam = {
  id: v4(),
  userId: userToAdd.id,
  postId: postToAdd.id,
  content: "Hello",
  publishedAt: new Date(),
};
const commentToAdd = new CommentEntity(commentParam);

describe("Comment to add", () => {
  beforeAll(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("Should create a comment", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockCtx.prisma.post.findUnique.mockResolvedValue(postToAdd);
    mockCtx.prisma.comment.create.mockResolvedValue(commentToAdd);
    const comment = await CommentRepository.create(commentToAdd, ctx);
    expect(comment).toEqual(commentToAdd);
  });
  it("Should find a comment using the provided id", async () => {
    mockCtx.prisma.comment.findUnique.mockResolvedValue(commentToAdd);
    const comment = await CommentRepository.findOne(commentToAdd.id,ctx)
    expect(comment).toEqual(commentToAdd)
  });
  it("Should  a comment if it exists", async () => {
    mockCtx.prisma.comment.findUnique.mockResolvedValue(commentToAdd);
    const commentToUpdate = commentToAdd;
    commentToUpdate.content = "WOW";
    mockCtx.prisma.comment.update.mockResolvedValue(commentToAdd);
    const comment = await CommentRepository.update(commentToUpdate, ctx);
    expect(comment).toEqual(commentToUpdate);
  });
  it("Should delete a comment if it exists", async () => {
    mockCtx.prisma.comment.findUnique.mockResolvedValue(commentToAdd);
    mockCtx.prisma.comment.delete.mockResolvedValue(commentToAdd);
    const  comment = await CommentRepository.deleteOne(commentToAdd.id,ctx)
    expect(comment).toEqual(commentToAdd);
    mockCtx.prisma.comment.findUnique.mockResolvedValue(null);
    expect(CommentRepository.findOne(userToAdd.id,ctx)).not.toEqual(commentToAdd)

  });
});
