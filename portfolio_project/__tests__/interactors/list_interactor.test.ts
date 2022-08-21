/** @format */

import { MockContext, createMockContext, Context } from "@repos/prismaContext";
import { userData, listData } from "test_data";
import listInteractor from "@interactors/list_interactor";
import { createAndUpdateParam, IdFilter } from "@repos/repo_types";

let mockCtx: MockContext;
let ctx: Context;
let mockList: any;

let idFilter: IdFilter;
let createOrUpdateParams: createAndUpdateParam<"list">;
describe("List Repository", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    mockList = mockCtx.db.list;
    idFilter = { id: listData.id, ctx };
    createOrUpdateParams = { data: listData, ctx };
  });

  it("Should a list create a list", async () => {
    mockCtx.db.user.findUnique.mockResolvedValue(userData.data);
    mockList.create.mockResolvedValue(listData);

    const list = await listInteractor.create(createOrUpdateParams);
    expect(list.data).toEqual(listData);
  });

  it("Should find a list using the provided id ", async () => {
    mockList.findUnique.mockResolvedValue(listData);

    const list = await listInteractor.findOneById(idFilter);
    expect(list.data).toEqual(listData);
  });

  it("Should update a list if it exists", async () => {
    const listToUpdate = listData;
    listToUpdate.title = "Hello";
    mockList.findUnique.mockResolvedValue(listData);
    mockList.update.mockResolvedValue(listToUpdate);

    const list = await listInteractor.update(createOrUpdateParams);
    expect(list.data).toEqual(listToUpdate);
  });

  it("Should delete a list if it exists", async () => {
    mockList.findUnique.mockResolvedValue(listData);
    mockList.delete.mockResolvedValue(listData);

    const list = await listInteractor.deleteOne(idFilter);
    expect(list.data).toEqual(listData);

    mockList.findUnique.mockResolvedValue(null);
    const foundList = await listInteractor.findOneById(idFilter);
    expect(foundList.data).toEqual(null);
  });
  it("Should retrun an error if the list does not exist", async () => {
    mockList.findUnique.mockResolvedValue(null);
    const list = await listInteractor.checkIfListExists(idFilter);
    expect(list).toBeFalsy();
  });
});
