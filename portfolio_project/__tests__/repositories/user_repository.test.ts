/** @format */

import { v4 } from "uuid";
import UserEntity from "../../pages/api/entities/User";
import UserRepository from "../../pages/api/repositories/UserRepository";
import {
  MockContext,
  Context,
  createMockContext,
} from "../../pages/api/repositories/prismaContext";
///let user: UserEntity;

let mockCtx: MockContext;
let ctx: Context;
const userToAdd = new UserEntity({
  name: "Abudi",
  password: "abcdefghijklmnopqrstuvwxyz",
  email: "test400@user.com",
  aboutUser: null,
  id: v4(),
  avatar: null,
  birthday: null,
  gender: "M",
  job: null,
  location: null,
  profileBackground: null,
  status: null,
});

//let user: UserEntity;

describe("User repository", () => {
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it("Should create a user", async () => {
    mockCtx.prisma.user.create.mockResolvedValue(userToAdd);
    const user = await UserRepository.create(userToAdd, ctx);
    expect(user).toEqual(userToAdd);
  });
  it("Should find a user who has the provided id", async () => {
    // The return value of findUniuqe should be userToadd this time
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    const foundUser = await UserRepository.findOne(userToAdd.id, ctx);
    expect(foundUser).toEqual(userToAdd);
  });

  it("Should delete a user if it exists", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockCtx.prisma.user.delete.mockResolvedValue(userToAdd);

    const deletedUser = await UserRepository.deleteOne(userToAdd.id, ctx);
    expect(mockCtx.prisma.user.findUnique).toHaveBeenCalled();
    expect(deletedUser).toEqual(userToAdd);
  });

  it("Should update a user if it exists", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);

    const userToUpdate = userToAdd;
    userToUpdate.name = "Bob";

    mockCtx.prisma.user.update.mockResolvedValue(userToUpdate);
    const updatedUser = await UserRepository.update(userToUpdate, ctx);
    expect(mockCtx.prisma.user.findUnique).toHaveBeenCalled();
    expect(updatedUser).toEqual(userToUpdate);
  });
});
