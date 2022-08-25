/** @format */

import userInteractor from "@interactors/user_interactor";
import toDomainValueParser from "business/parsers/parse_to_domain";
import { IUser } from "business/parsers/api_types";
import { Context } from "@repos/prismaContext";
import { userNotFound } from "@interactors/errors";
import postMutations from "./post_mutation";
import listMutations from "./list_mutation";
import commentMutations from "./comment_mutation";
/** @format */

type DBContext = { db: Context };
type UserArgs = { user: IUser };
type IdArgs = { id: string };
const { domainFullUser } = toDomainValueParser;
const mutation = {
  addUser: async (_: never, args: UserArgs, ctx: DBContext) => {
    const data = domainFullUser(args.user);
    return await userInteractor.create({ data, ctx: ctx.db });
  },
  updateUser: async (_: never, args: UserArgs, { db }: DBContext) => {
    const user = await userInteractor.findOneById({
      id: args.user.id,
      ctx: db,
    });
    if (!user) throw userNotFound;
    const domainUser = toDomainValueParser.domainUser(args.user);
    (Object.keys(args.user) as (keyof typeof domainUser)[]).forEach(
      (k) =>
        //@ts-ignore
        (user[k] = domainUser[k])
    );

    return await userInteractor.update({
      data: user,
      ctx: db,
    });
  },
  deleteUser: async (_: never, args: IdArgs, ctx: DBContext) => {
    return await userInteractor.deleteOne({ id: args.id, ctx: ctx.db });
  },
  ...postMutations,
  ...commentMutations,
  // ...taskMutations,
  ...listMutations,
};

export default mutation;
