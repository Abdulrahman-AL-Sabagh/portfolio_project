/** @format */

import { Prisma } from "@prisma/client";
/** @format */

import { PrismaClient } from "@prisma/client";
/** @format */

import { User } from "@prisma/client";
/** @format */

import { UserRepoFunctions } from "./../../pages/api/repositories/repo-types.d";
import { v4 } from "uuid";
import UserEntity from "../../pages/api/entities/User";
import UserRepository from "../../pages/api/repositories/UserRepository";

///let user: UserEntity;
const userToAdd = new UserEntity({
  name: "Abudi",
  password: "12345678",
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
const mockArg = jest.fn().mockReturnValue(userToAdd);
let prismaMock: UserRepoFunctions;

describe("User repository", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    prismaMock = {
      findUnique: jest.fn().mockResolvedValue(null),
      create: mockArg,
      delete: jest.fn().mockResolvedValue(userToAdd),
      update: jest.fn(),
      findMany: jest.fn(),
    };
    // prismaMock = {
    //   findUnique: jest.fn().mockResolvedValue(null),
    //   create: mockArg,
    //   delete: mockArg,
    //   update: jest.fn(),
    //   findMany: jest.fn(),

    // };
  });

  it("Should create a user", async () => {
    const user = await UserRepository.create(userToAdd, prismaMock);

    expect(prismaMock.create).toHaveBeenCalled();
    expect(user).toEqual(userToAdd);
  });
  it("Should find a user who has the provided id", async () => {
    // The return value of findUniuqe should be userToadd this time
    prismaMock.findUnique = jest.fn().mockResolvedValue(userToAdd);
    const foundUser = await UserRepository.findOne(userToAdd.id, prismaMock);

    expect(prismaMock.findUnique).toBeCalled();
    expect(foundUser).toEqual(userToAdd);
  });

  it("Should delete a user if it exists", async () => {
    prismaMock.findUnique = jest.fn().mockResolvedValue(userToAdd);
    console.log(userToAdd.id);
    const deletedUser = await UserRepository.deleteOne(
      userToAdd.id,
      prismaMock
    );
    expect(prismaMock.findUnique).toBeCalled();
    expect(prismaMock.delete).toBeCalled();
    expect(deletedUser).toEqual(userToAdd);
    prismaMock.findUnique = jest.fn().mockResolvedValue(null);
    expect(UserRepository.findOne(userToAdd.id,prismaMock)).not.toEqual(userToAdd)
  });

  it("Should update a user if it exists", async () => {
    prismaMock.findUnique = jest.fn().mockResolvedValue(userToAdd);

    const userToUpdate = userToAdd;
    userToUpdate.name = "Bob";
    prismaMock.update = jest.fn().mockResolvedValue(userToUpdate);
    const updatedUser = await UserRepository.update(userToUpdate, prismaMock);

    expect(prismaMock.update).toBeCalled();
    expect(prismaMock.update).toBeCalled();
    expect(updatedUser).toEqual(userToUpdate);
  });
});
