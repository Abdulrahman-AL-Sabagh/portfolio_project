
import { vId } from "./../../../lib/validators";
/** @format */


import UserEntity from "../entities/User";
import prisma from "../../../lib/prisma";
import { hashSync } from "bcrypt";
import { User } from "@prisma/client";

const saltRounds = 10;

const UserRepository = {
  createUser: async (userData: User): Promise<UserEntity | undefined> => {
    let user;
    try {
      user = new UserEntity(userData);

      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashSync(user.password, saltRounds),
          avatar: user.avatar,
          aboutUser: user.aboutUser,
          birthday: user.birthday,
          gender: user.gender,
          job: user.job,
          status: user.status,
          location: user.location,
          profileBackground: user.profileBackground,
        },
      });
    } catch (error) {
      throw error;
    }

    return user;
  },
  createFriend: (id: string, user: UserEntity) => {},
  deleteUser: async (id: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return false;
    }
  },
  deleteFriend: (id: string, user: UserEntity) => {},
  getUserById: async (id: string): UserEntity | undefined => {
    try {
      vId.parse(id);
    } catch (error) {
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    }).users();
    if (!user) {
      return undefined;
    }
    return new UserEntity({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    });
  },
};


const prismaUserParse = (Prisma)=> {

}