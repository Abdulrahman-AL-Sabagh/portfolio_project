/** @format */

import { listNotFound } from "@interactors/errors";
import listInteractor from "@interactors/list_interactor";
import toDomainValueParser from "business/parsers/parse_to_domain";
import { DBContext, IdArgs, ListArgs } from "./resolver_types";

const { domainList, domainFullList } = toDomainValueParser;
const { update, create, deleteOne, findOneById } = listInteractor;

const addList = async (parent: never, args: ListArgs, { db }: DBContext) => {
  const data = domainFullList(args.list);
  return await create({ ctx: db, data });
};

const updateList = async (parent: never, args: ListArgs, { db }: DBContext) => {
  const list = await findOneById({ id: args.list.id, ctx: db });
  if (!list) throw listNotFound;
  const argsData = domainList(args.list);
  (Object.keys(argsData) as (keyof typeof argsData)[]).forEach(
    //@ts-ignore
    (k) => (list[k] = argsData[k])
  );
  return await update({ data: list, ctx: db });
};

const deleteList = async (parent: never, args: IdArgs, { db }: DBContext) => {
  return await deleteOne({ id: args.id, ctx: db });
};

const listMutations = {
  addList,

  updateList,
  deleteList,
};

export default listMutations;
