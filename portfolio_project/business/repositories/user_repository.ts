/** @format */
import { findOneById, findOneByEmail } from "./user/find_one_user";
import { findMany, findManyByName } from "./user/find_many_users";
import create from "./user/create_user";
import update from "./user/update_user";
import deleteOne from "./user/delete_user";

const UserRepository = {
  create,
  findOneById,
  update,
  deleteOne,
  findMany,
  findOneByEmail,
  findManyByName,
};

export default UserRepository;
