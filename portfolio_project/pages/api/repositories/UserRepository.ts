/** @format */

import { User } from "@prisma/client";
import create from "./user/create_user";
import findOne from "./user/find_one_user";
import { hashSync } from "bcrypt";
import update from "./user/update_user";
import findMany from "./user/find_many_users";
import deleteOne from "./user/delete_user";

export function allUserData(user: User) {
  const saltRounds = 10;
  return {
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
  };
}

const UserRepository = { create, findOne, update, deleteOne, findMany };

export default UserRepository;
