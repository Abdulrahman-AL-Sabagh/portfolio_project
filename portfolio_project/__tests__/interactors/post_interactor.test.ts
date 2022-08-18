/** @format */

import postInteractor from "@interactors/post_interactor";
import { MockContext, Context, createMockContext } from "@repos/prismaContext";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";
import { userData, postData } from "test_data";

let mockCtx: MockContext;
let ctx: Context;
let createOrUpdate: createAndUpdateParam<"post">;
let idFilter: IdFilter;
let mockPost: any;
describe("Post repository", () => {
  beforeAll(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    idFilter = { id: postData.id, ctx };
    createOrUpdate = { data: postData, ctx };
    mockPost = mockCtx.db.post;
  });
  it("Should create a post", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData);
    mockPost.create.mockResolvedValue(postData);
    const post = await postInteractor.create(createOrUpdate);
    expect(ctx.db.user.findUnique).toHaveBeenCalled();

    expect(post).toEqual(postData);
  });
  it("Should find the post using the provided id", async () => {
    mockPost.findUnique.mockResolvedValue(postData);
    const post = await postInteractor.findOneById(idFilter);

    expect(post).toEqual(postData);
  });
  it("Should update a post if it exist", async () => {
    mockPost.findUnique.mockResolvedValue(postData);

    const postToUpdate = postData;
    postToUpdate.title = "I AM A PRO!";
    mockPost.update.mockResolvedValue(postToUpdate);
    const post = await postInteractor.update(createOrUpdate);
    expect(ctx.db.post.findUnique).toHaveBeenCalled();
    expect(post).toEqual(postToUpdate);
  });
  it("Should delete a post if it exist", async () => {
    mockPost.findUnique.mockResolvedValue(postData);
    mockPost.delete.mockResolvedValue(postData);

    const post = await postInteractor.deleteOne(idFilter);
    expect(ctx.db.post.findUnique).toHaveBeenCalled();
    expect(post).toEqual(postData);
    mockPost.findUnique.mockResolvedValue(null);
    const foundPost = await postInteractor.findOneById(idFilter);
    expect(foundPost).toBeNull();
  });
});
