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
//let user: UserEntity;

describe("User repository", () => {
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    idFilter = { id: userData.id, ctx };
    createAndUpdateParams = { data: userData, ctx };
  });

  it("Should create a user", async () => {
    mockCtx.db.user.create.mockResolvedValue(userData);
    const user = await userInteractor.create(createAndUpdateParams);
    expect(user).toEqual(userData);
  });
  it("Should find a user who has the provided id", async () => {
    // The return value of findUniuqe should be userToadd this time
    mockCtx.db.user.findUnique.mockResolvedValue(userData);
    const foundUser = await userInteractor.findOneById(idFilter);
    expect(foundUser).toEqual(userData);
  });

  it("Should delete a user if it exists", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData);
    mockCtx.db.user.delete.mockResolvedValue(userData);

    const deletedUser = await userInteractor.deleteOne(idFilter);
    expect(mockCtx.db.user.findUnique).toHaveBeenCalled();
    expect(deletedUser).toEqual(userData);
  });

  it("Should update a user if it exists", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData);

    const userToUpdate = userData;
    userToUpdate.name = "Bob";

    mockCtx.db.user.update.mockResolvedValue(userToUpdate);
    const updatedUser = await userInteractor.update(createAndUpdateParams);
    expect(mockCtx.db.user.findUnique).toHaveBeenCalled();
    expect(updatedUser).toEqual(userToUpdate);
  });
});
