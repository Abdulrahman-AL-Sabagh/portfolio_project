/** @format */

import toDomainValueParser from "business/parsers/parse_to_domain";
import { TaskArgs, IdArgs, DBContext } from "./resolver_types";
import taskInteractor from "@interactors/task_interactor";
import { taskNotFound } from "@interactors/errors";
const addTask = async (parent: never, args: TaskArgs, ctx: DBContext) => {
  const task = toDomainValueParser.domainFullTask(args.task);
  return await taskInteractor.create({
    data: task,
    ctx: ctx.db,
  });
};

const updateTask = async (parent: never, args: TaskArgs, { db }: DBContext) => {
  const task = await taskInteractor.findOneById({ id: args.task.id, ctx: db });
  if (!task) throw taskNotFound;
  const domainTask = toDomainValueParser.domainTask(args.task);
  (Object.keys(args.task) as (keyof typeof domainTask)[]).forEach(
    //@ts-ignore
    (k) => (task[k] = args.task[k])
  );
  return await taskInteractor.update({ data: task, ctx: db });
};

const deleteTask = async (parent: never, { id }: IdArgs, { db }: DBContext) => {
  return await taskInteractor.deleteOne({ id, ctx: db });
};

const taskMutations = {
  addTask,
  updateTask,
  deleteTask,
};
export default taskMutations;
