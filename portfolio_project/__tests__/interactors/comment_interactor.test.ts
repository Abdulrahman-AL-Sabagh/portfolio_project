/** @format */

import { Context, createMockContext, MockContext } from "@repos/prismaContext";
import commentInteractor from "@interactors/comment_interactor";
import { v4 } from "uuid";
import { postData, userData } from "test_data";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";

let mockCtx: MockContext;
let ctx: Context;
let idFilter: IdFilter;
let createAndUpdateParams: createAndUpdateParam<"comment">;
let mockComment: any;
const data = {
  id: v4(),
  userId: userData.id,
  postId: postData.id,
  content: "Hello",
  publishedAt: new Date(),
};

describe("Comment to add", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockComment = mockCtx.db.comment;
    createAndUpdateParams = { data, ctx };
    idFilter = { id: data.id, ctx };
  });

  it("Should create a comment", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData);
    mockCtx.db.post.findUnique.mockResolvedValue(postData);
    mockComment.create.mockResolvedValue(data);
    const comment = await commentInteractor.create(createAndUpdateParams);
    expect(comment).toEqual(data);
  });
  it("Should find a comment using the provided id", async () => {
    mockComment.findUnique.mockResolvedValue(data);
    const comment = await commentInteractor.findOneById(idFilter);
    expect(comment).toEqual(data);
  });
  it("Should  a comment if it exists", async () => {
    mockComment.findUnique.mockResolvedValue(data);
    const commentToUpdate = data;
    commentToUpdate.content = "WOW";
    mockComment.update.mockResolvedValue(data);
    const comment = await commentInteractor.update(createAndUpdateParams);
    expect(comment).toEqual(commentToUpdate);
  });
  it("Should delete a comment if it exists", async () => {
    mockComment.findUnique.mockResolvedValue(data);
    mockComment.delete.mockResolvedValue(data);
    const comment = await commentInteractor.deleteOne(idFilter);
    expect(comment).toEqual(data);
    mockComment.findUnique.mockResolvedValue(null);
    expect(commentInteractor.findOneById(idFilter)).not.toEqual(data);
  });
});
