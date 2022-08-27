/** @format */

import { getTestUser } from "test_data/test_queries";
import {
  createTestUser,
  createTestList,
  createTestTask,
} from "test_data/test_create_mutations";
import { ApolloClient, gql } from "@apollo/client";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { testServerConfig } from "test_data/test_config";
import { taskData } from "test_data/test_data";
import { taskProperties } from "test_data/schema_peroperties";

let server: ApolloClient<any>;
describe("Comment query ", () => {
  beforeAll(() => (server = new ApolloClient(testServerConfig)));
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (userExists.data.user) await deleteTestUser(server);
    await createTestUser(server);
    await createTestList(server);
  });
  afterEach(() => deleteTestUser(server));
  afterAll(() => server.stop);
  it("Should find a task using the provided id", async () => {
    await createTestTask(server);
    const findTask = gql`query Task($id: ID!){
      task(id: $id) {
      ${taskProperties}   
      }
    }`;
    const { data } = await server.query({
      query: findTask,
      variables: { id: taskData.id },
    });
    const result = data.task;
    expect(result).toEqual({ ...result, __typename: result.__typename });
  });
});
