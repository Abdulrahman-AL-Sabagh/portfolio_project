/** @format */

import { User } from "@prisma/client";
import create from "./user/create_user";
import findOne from "./user/find_one_user";
import update from "./user/update_user";
import findMany from "./user/find_many_users";
import deleteOne from "./user/delete_user";
import UserEntity from "../entities/User";
import { hashSync } from "bcrypt";

export function allUserData(user: User) {
  let validatedUser: UserEntity;
  try {
    validatedUser = new UserEntity(user);
  } catch (error) {
    throw error;
  }
  return {
    name: validatedUser.name,
    email: validatedUser.email,
    password: hashSync(validatedUser.password, 10),
    avatar: validatedUser.avatar,
    aboutUser: validatedUser.aboutUser,
    birthday: validatedUser.birthday,
    gender: validatedUser.gender,
    job: validatedUser.job,
    status: validatedUser.status,
    location: validatedUser.location,
    profileBackground: validatedUser.profileBackground,
  };
}

const UserRepository = { create, findOne, update, deleteOne, findMany };

export default UserRepository;
