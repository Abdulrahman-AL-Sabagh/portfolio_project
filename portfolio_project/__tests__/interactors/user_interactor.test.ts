/** @format */

import { userData } from "test_data";
import userInteractor from "@interactors/user_interactor";
import { MockContext, Context, createMockContext } from "@repos/prismaContext";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";
///let user: UserEntity;

let mockCtx: MockContext;
let ctx: Context;

let idFilter: IdFilter;
let createAndUpdateParams: createAndUpdateParam<"user">;
let mockUser: any;

//let user: UserEntity;

describe("User repository", () => {
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockUser = mockCtx.db.user;
    idFilter = { id: userData.data.id, ctx };
    createAndUpdateParams = { data: userData.data, ctx };
  });

  it("Should create a user", async () => {
    mockUser.create.mockResolvedValue(userData.data);
    mockUser.findUnique.mockResolvedValue(null);
    const user = await userInteractor.create(createAndUpdateParams);
    expect(user.data).toEqual(userData.data);
  });
  it("Should find a user who has the provided id", async () => {
    // The return value of findUniuqe should be userToadd this time
    mockUser.findUnique.mockResolvedValue(userData);
    const user = await userInteractor.findOneById(idFilter);
    expect(user.data).toEqual(userData);
  });

  it("Should delete a user if it exists", async () => {
    mockUser.findUnique.mockResolvedValue(userData);
    mockUser.delete.mockResolvedValue(userData);

    const user = await userInteractor.deleteOne(idFilter);
    expect(mockUser.findUnique).toHaveBeenCalled();
    expect(user.data).toEqual(userData);
  });

  it("Should update a user if it exists", async () => {
    mockUser.findUnique.mockResolvedValue(userData);

    const userToUpdate = userData;
    userToUpdate.data.name = "Bob";

    mockUser.update.mockResolvedValue(userToUpdate);
    const user = await userInteractor.update(createAndUpdateParams);
    expect(mockUser.findUnique).toHaveBeenCalled();
    expect(user.data).toEqual(userToUpdate);
  });
  it("Should return false if the user does not exist", async () => {
    mockUser.findUnique.mockResolvedValue(null);
    const userExists = await userInteractor.checkIfUserExists(idFilter);
    expect(userExists).toBeFalsy();
  });
});
