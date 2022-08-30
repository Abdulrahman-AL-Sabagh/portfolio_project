/** @format */

import { Context, createMockContext, MockContext } from "@repos/prismaContext";
import { listData, taskData } from "test_data/test_data";
import taskInteractor from "@interactors/task_interactor";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";
let ctx: Context;
let mockCtx: MockContext;
let mockTask: any;

let createAndUpdateParams: createAndUpdateParam<"task">;
let idFilter: IdFilter;
const taskNotFoundErr = new Error("Task not found");

describe("Task Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockTask = mockCtx.db.task;
    createAndUpdateParams = { data: taskData, ctx };
    idFilter = { id: taskData.id, ctx };
  });
  it("Should create a task if the list exists", async () => {
    mockCtx.db.list.findUnique.mockResolvedValue(listData);
    mockTask.create.mockResolvedValue(taskData);

    const task = await taskInteractor.create(createAndUpdateParams);
    expect(task).toEqual(taskData);
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
    mockTask.findUnique.mockResolvedValue(taskData);
    const task = await taskInteractor.findOneById(idFilter);
    expect(task).toEqual(taskData);
  });

  it("Should return null if task is not found", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    const task = await taskInteractor.findOneById(idFilter);
    expect(task).not.toEqual(taskData);
  });

  it("Should update a task if it exists", async () => {
    const taskToUpdate = { ...taskData, title: "A task to update" };
    mockTask.findUnique.mockResolvedValue(taskData);
    mockTask.update.mockResolvedValue(taskToUpdate);
    const task = await taskInteractor.update(createAndUpdateParams);
    expect(task).toEqual(taskToUpdate);
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
    mockTask.findUnique.mockResolvedValue(taskData);
    mockTask.delete.mockResolvedValue(taskData);
    const task = await taskInteractor.deleteOne(idFilter);

    expect(task).toEqual(taskData);
    mockTask.findUnique.mockResolvedValue(null);
    const foundTask = await taskInteractor.findOneById(idFilter);
    expect(foundTask).not.toEqual(taskData);
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
