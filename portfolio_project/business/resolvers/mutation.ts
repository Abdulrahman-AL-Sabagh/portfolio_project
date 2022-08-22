/** @format */

import userInteractor from "@interactors/user_interactor";
import toDomainValueParser from "business/parsers/parse_to_domain";
import { IUser } from "business/parsers/api_types";
import { Context } from "@repos/prismaContext";
import { userNotFound } from "@interactors/errors";
/** @format */

type DBContext = { db: Context };
type UserArgs = { user: IUser };
type IdArgs = { id: string };
const { domainUser } = toDomainValueParser;
const mutation = {
  addUser: async (_: never, args: UserArgs, ctx: DBContext) => {
    const data = domainUser(args.user);
    const user = await userInteractor.create({ data, ctx: ctx.db });
    return user;
  },
  updateUser: async (_: never, args: UserArgs, { db }: DBContext) => {
    const foundUser = await userInteractor.findOneById({
      id: args.user.id,
      ctx: db,
    });
    if (!foundUser) throw userNotFound;
    const userToParse = {
      ...args.user,
      email: args.user.email ?? foundUser.email,
      password: args.user.password ?? foundUser.password,
      name: args.user.name ?? foundUser.name,
    };

    const user = await userInteractor.update({
      data: toDomainValueParser.domainUser(userToParse),
      ctx: db,
    });
    return user;
  },
  deleteUser: async (_: never, args: IdArgs, ctx: DBContext) => {
    const user = await userInteractor.deleteOne({ id: args.id, ctx: ctx.db });
    console.log(user);
    return user;
  },
};

export default mutation;
