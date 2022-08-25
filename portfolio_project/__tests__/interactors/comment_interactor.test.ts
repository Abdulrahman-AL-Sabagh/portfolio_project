/** @format */

import { Context, createMockContext, MockContext } from "@repos/prismaContext";
import commentInteractor from "@interactors/comment_interactor";
import { v4 } from "uuid";
import { postData, userData, commentData } from "test_data/test_data";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";

let mockCtx: MockContext;
let ctx: Context;
let idFilter: IdFilter;
let createAndUpdateParams: createAndUpdateParam<"comment">;
let mockComment: any;

describe("Comment to add", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockComment = mockCtx.db.comment;
    createAndUpdateParams = { data: commentData, ctx };
    idFilter = { id: commentData.id, ctx };
  });

  it("Should create a comment", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData);
    mockCtx.db.post.findUnique.mockResolvedValue(postData);
    mockComment.create.mockResolvedValue(commentData);
    const comment = await commentInteractor.create(createAndUpdateParams);
    expect(comment).toEqual(commentData);
  });
  it("Should find a comment using the provided id", async () => {
    mockComment.findUnique.mockResolvedValue(commentData);
    const comment = await commentInteractor.findOneById(idFilter);
    expect(comment).toEqual(commentData);
  });
  it("Should  a comment if it exists", async () => {
    mockComment.findUnique.mockResolvedValue(commentData);
    const commentToUpdate = commentData;
    commentToUpdate.content = "WOW";
    mockComment.update.mockResolvedValue(commentData);
    const comment = await commentInteractor.update(createAndUpdateParams);
    expect(comment).toEqual(commentToUpdate);
  });
  it("Should delete a comment if it exists", async () => {
    mockComment.findUnique.mockResolvedValue(commentData);
    mockComment.delete.mockResolvedValue(commentData);
    const comment = await commentInteractor.deleteOne(idFilter);
    expect(comment).toEqual(commentData);
    mockComment.findUnique.mockResolvedValue(null);
    expect(commentInteractor.findOneById(idFilter)).not.toEqual(commentData);
  });
  it("Should retrun an error if the comment does not exist", async () => {
    mockComment.findUnique.mockResolvedValue(null);
    const comment = await commentInteractor.checkIfCommentExists(idFilter);
    expect(comment).toBeFalsy();
  });
});
