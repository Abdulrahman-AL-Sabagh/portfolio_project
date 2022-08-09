/** @format */

import TaskEntity from "@entities/todolist/Task";
import { Task } from "@prisma/client";
import { Context, createMockContext, MockContext } from "@repos/prismaContext";
import TaskRepository from "@repos/TaskRepository";
import { v4 } from "uuid";
import { listToAdd } from "test_data";
let ctx: Context;
let mockCtx: MockContext;
let mockTask: any;
const taskData: Task = {
  id: v4(),
  deadLine: new Date(new Date().setMinutes(new Date().getMinutes() + 100)),
  description: "hello",
  title: "Hello",
  titleColor: "red",
  listId: listToAdd.id,
};

const taskNotFoundErr = new Error("Task not found");

const taskToAdd = new TaskEntity(taskData);
describe("Task Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockTask = mockCtx.prisma.task;
  });
  it("Should create a task if the list exists", async () => {
    mockCtx.prisma.list.findUnique.mockResolvedValue(listToAdd);
    mockTask.create.mockResolvedValue(taskToAdd);

    const task = await TaskRepository.create(taskData, ctx);
    expect(task).toEqual(taskToAdd);
  });
  it("Should throw an Error if list does not exists", async () => {
    mockCtx.prisma.list.findUnique.mockResolvedValue(null);
    const listError = new Error("List not found");
    try {
      await TaskRepository.create(taskData, ctx);
    } catch (error) {
      expect(error).toEqual(listError);
    }
  });

  it("Should find a task using the provided id", async () => {
    mockTask.findUnique.mockResolvedValue(taskToAdd);
    const task = await TaskRepository.findOne(taskData.id, ctx);
    expect(task).toEqual(taskToAdd);
  });

  it("Should return null if task is not found", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    const task = TaskRepository.findOne(taskData.id, ctx);
    expect(task).not.toEqual(taskToAdd);
  });

  it("Should update a task if it exists", async () => {
    mockTask.findUnique.mockResolvedValue(taskToAdd);
  });
  it("Should throw an error in update if task does not exist", async () => {
    mockTask.findUnique.mockResolvedValue(null);
    try {
      await TaskRepository.update(taskData, ctx);
    } catch (error) {
      expect(error).toEqual(taskNotFoundErr);
    }
  });

  it("Should delete a task if it exists", async () => {
    mockTask.findUnique.mockResolvedValue(taskToAdd);
    mockTask.delete.mockResolvedValue(taskToAdd);
    const task = await TaskRepository.deleteOne(taskToAdd.id, ctx);

    expect(task).toEqual(taskToAdd);
    mockTask.findUnique.mockResolvedValue(null);
    const foundTask = await TaskRepository.findOne(taskToAdd.id,ctx)
    expect(foundTask).not.toEqual(taskToAdd);
  });
 
  it("Should throw an error in delete if task does not exist", async()=>{
    mockTask.findUnique.mockResolvedValue(null)
    try {
        await TaskRepository.deleteOne(taskToAdd.id,ctx);
    } catch (error) {
        expect(error).toEqual(taskNotFoundErr);
    }

  })
});
