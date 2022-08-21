/** @format */
import { findOneById, findOneByEmail } from "./user/find_one_user";
import { findManyByName, findMany } from "./user/find_many_users";
import create from "./user/create_user";
import update from "./user/update_user";
import deleteOne from "./user/delete_user";
import { FindAll } from "./repo_types";

const findAll: FindAll<"user"> = async (ctx) => {
  return {
    data: await ctx.db.user.findMany(),
  };
};

const UserRepository = {
  create,
  findOneById,
  update,
  deleteOne,
  findAll,
  findMany,
  findOneByEmail,
  findManyByName,
};

export default UserRepository;
