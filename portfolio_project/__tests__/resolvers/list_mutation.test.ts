/** @format */

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { listData } from "test_data/test_data";
import {
  createTestList,
  createTestUser,
} from "test_data/test_create_mutations";
import { getTestUser } from "test_data/test_queries";
import {
  deleteTestList,
  deleteTestUser,
} from "test_data/test_delete_mutations";

let server: ApolloClient<any>;

describe("List mutation", () => {
  beforeAll(async () => {
    server = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.NEXT_PUBLIC_API,
    });
    // await deleteTestUser(server);
  });
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (!userExists.data.user) {
      await createTestUser(server);
    } else {
      await deleteTestUser(server);
      await createTestUser(server);
    }
  });
  afterEach(async () => await deleteTestUser(server));
  afterAll(async () => {
    await deleteTestUser(server);
    server.stop();
  });
  it("Should create a list", async () => {
    const { data } = await createTestList(server);
    const result = data.addList;
    delete result.__typename;
    expect(result).toEqual(listData);
  });
  it("Should update a list", async () => {});
  it("Should delete a list", async () => {
    await createTestList(server);
    const { data } = await deleteTestList(server);
    const result = data.deleteList;
    delete result.__typename;
    expect(result.id).toEqual(listData.id);
  });
});
