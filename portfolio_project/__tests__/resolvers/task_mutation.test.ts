/** @format */

import { ApolloClient, gql } from "@apollo/client";
import { taskProperties } from "test_data/schema_peroperties";
import { testServerConfig } from "test_data/test_config";
import {
  createTestList,
  createTestTask,
  createTestUser,
} from "test_data/test_create_mutations";
import { taskData } from "test_data/test_data";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { getTestUser } from "test_data/test_queries";

let server: ApolloClient<any>;

describe("Task mutation", () => {
  beforeAll(() => (server = new ApolloClient(testServerConfig)));
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (userExists.data.user) await deleteTestUser(server);
    await createTestUser(server);
    await createTestList(server);
  });

  afterEach(() => deleteTestUser(server));
  afterAll(() => server.stop());

  it("Should create a task", async () => {
    const { data } = await createTestTask(server);
    const result = data.addTask;
    delete result.__typename;
    expect(result).toEqual(taskData);
  });
  it("Should update a task", async () => {
    await createTestTask(server);

    const task = { ...taskData, title: "pink" };

    const updateTask = gql`
      mutation UpdateTask($task: TaskToUpdate) {
        updateTask(task: $task) {
          ${taskProperties}
        }
      }
    `;
    const { data } = await server.mutate({
      mutation: updateTask,
      variables: { task: task },
    });
    const result = data?.updateTask;
    delete result.__typename;
    expect(result).toEqual(task);
  });

  it("Should delete a task", async () => {
    await createTestTask(server);
    const deleteTask = gql`mutation deleteTask($id: ID!) {
      deleteTask(id: $id) {
        ${taskProperties}
      }
    }`;
    const { data, errors } = await server.mutate({
      mutation: deleteTask,
      variables: { id: taskData.id },
    });
    const result = data.deleteTask;
    delete result.__typename;
    expect(result.id).toEqual(taskData.id);
  });
});
