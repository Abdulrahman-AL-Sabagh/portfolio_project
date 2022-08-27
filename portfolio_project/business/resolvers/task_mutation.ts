/** @format */

import toDomainValueParser from "business/parsers/parse_to_domain";
import { TaskArgs, IdArgs, DBContext } from "./resolver_types";
import taskInteractor from "@interactors/task_interactor";
import { taskNotFound } from "@interactors/errors";

const { domainTask, domainFullTask } = toDomainValueParser;

const { findOneById, create, update, deleteOne } = taskInteractor;

const addTask = async (parent: never, args: TaskArgs, ctx: DBContext) => {
  const data = domainFullTask(args.task);
  return await create({ data, ctx: ctx.db });
};

const updateTask = async (parent: never, args: TaskArgs, { db }: DBContext) => {
  const task = await findOneById({ id: args.task.id, ctx: db });
  if (!task) throw taskNotFound;
  const taskData = domainTask(args.task);
  (Object.keys(args.task) as (keyof typeof taskData)[]).forEach(
    //@ts-ignore
    (k) => (task[k] = args.task[k])
  );
  return await update({ data: task, ctx: db });
};

const deleteTask = async (parent: never, { id }: IdArgs, { db }: DBContext) => {
  return await deleteOne({ id, ctx: db });
};

const taskMutations = {
  addTask,
  updateTask,
  deleteTask,
};
export default taskMutations;
