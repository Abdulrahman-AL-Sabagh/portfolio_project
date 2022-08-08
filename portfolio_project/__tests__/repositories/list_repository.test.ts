/** @format */

import { MockContext, createMockContext, Context } from "@repos/prismaContext";
import { userToAdd } from "test_data";
import ListRepository from "@repos/ListRepository";
import { List } from ".prisma/client";
import { v4 } from "uuid";
import ListEntity from "@entities/todolist/List";
let ctx: Context;
let mockCtx: MockContext;
let mockList: any;

const listData: List = {
  id: v4(),
  title: "Superlist",
  color: "Magenta",
  titleColor: "black",
  userId: userToAdd.id,
};
const listToAdd = new ListEntity(listData);

describe("List Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockList = mockCtx.prisma.list;
  });

  it("Should a list create a list", async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userToAdd);
    mockList.create.mockResolvedValue(listToAdd);

    const list = await ListRepository.create(listData, ctx);
    expect(list).toEqual(listToAdd);
  });

  it("Should find a list using the provided id ", async () => {
    mockList.findUnique.mockResolvedValue(listToAdd);

    const list = await ListRepository.findOne(listToAdd.id, ctx);
    expect(list).toEqual(listToAdd);
  });

  it("Should update a list if it exists", async () => {
    const listToUpdate = listToAdd;
    listToUpdate.title = "Hello";
    mockList.findUnique.mockResolvedValue(listToAdd);
    mockList.update.mockResolvedValue(listToUpdate);

    const list = await ListRepository.update(listToUpdate, ctx);
    expect(list).toEqual(listToUpdate);
  });

  it("Should delete a list if it exists", async () => {
    mockList.findUnique.mockResolvedValue(listToAdd);
    mockList.delete.mockResolvedValue(listToAdd);

    const list = await ListRepository.deleteOne(listToAdd.id, ctx);
    expect(list).toEqual(listToAdd);

    mockList.findUnique.mockResolvedValue(null);
    const foundList = await ListRepository.findOne(listToAdd.id, ctx);
    expect(foundList).toEqual(null);
  });
});
