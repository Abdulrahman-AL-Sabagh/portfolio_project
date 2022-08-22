/** @format */

import { Context, createMockContext, MockContext } from "@repos/prismaContext";
import { v4 } from "uuid";
import { listData } from "test_data";
import taskInteractor from "@interactors/task_interactor";
import { Task } from "@prisma/client";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";
let ctx: Context;
let mockCtx: MockContext;
let mockTask: any;

const data: Task = {
  id: v4(),
  deadLine: new Date(new Date().setMinutes(new Date().getMinutes() + 100)),
  description: "hello",
  title: "Hello",
  titleColor: "red",
  listId: listData.id,
};
let createAndUpdateParams: createAndUpdateParam<"task">;
let idFilter: IdFilter;
const taskNotFoundErr = new Error("Task not found");

describe("Task Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockTask = mockCtx.db.task;
    createAndUpdateParams = { data, ctx };
    idFilter = { id: data.id, ctx };
  });
  it("Should create a task if the list exists", async () => {
    mockCtx.db.list.findUnique.mockResolvedValue(listData);
    mockTask.create.mockResolvedValue(data);

    const task = await taskInteractor.create(createAndUpdateParams);
    expect(task).toEqual(data);
  });
  it("Should throw an Error if list does not exists", async () => {
    mockCtx.db.list.findUnique.mockResolvedValue(null);
    const listError = new Error("List not found");
    try {
      await taskInteractor.create(createAndUpdateParams);
    } catch (error) {
      expect(error).toEqual(listError);
    }
  });

  it("Should find a task using the provided id", async () => {
    mockTask.findUnique.mockResolvedValue(data);
    const task = await taskInteractor.findOneById(idFilter);
    expect(task).toEqual(data);
  });

  it("Should return null if task is not found", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    const task = await taskInteractor.findOneById(idFilter);
    expect(task).not.toEqual(data);
  });

  it("Should update a task if it exists", async () => {
    mockTask.findUnique.mockResolvedValue(data);
  });
  it("Should throw an error in update if task does not exist", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    try {
      await taskInteractor.update(createAndUpdateParams);
    } catch (error) {
      expect(error).toEqual(taskNotFoundErr);
    }
  });

  it("Should delete a task if it exists", async () => {
    mockTask.findUnique.mockResolvedValue(data);
    mockTask.delete.mockResolvedValue(data);
    const task = await taskInteractor.deleteOne(idFilter);

    expect(task).toEqual(data);
    mockTask.findUnique.mockResolvedValue(null);
    const foundTask = await taskInteractor.findOneById(idFilter);
    expect(foundTask).not.toEqual(data);
  });

  it("Should throw an error in delete if task does not exist", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    try {
      await taskInteractor.deleteOne(idFilter);
    } catch (error) {
      expect(error).toEqual(taskNotFoundErr);
    }
  });

  it("Should return an error if task does not exist", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    const task = await taskInteractor.checkIfTaskExists(idFilter);
    expect(task).toBeFalsy();
  });
});
