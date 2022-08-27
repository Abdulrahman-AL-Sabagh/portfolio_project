/** @format */

import { userData } from "test_data/test_data";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { createTestUser } from "test_data/test_create_mutations";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { getTestUser } from "test_data/test_queries";
import { testServerConfig } from "test_data/test_config";
// import dotenv from "dotenv";
// dotenv.config();
let server: ApolloClient<any>;
const userProperties = `id
name
email
password
job
location
status
gender
avatar
profileBackground
birthday
aboutUser`;

describe("It should test the mutations", () => {
  beforeAll(() => {
    jest.setTimeout(1000000);
    server = new ApolloClient(testServerConfig);
  });

  afterEach(async () => {
    const userExists = await getTestUser(server);
    userExists.data.user && (await deleteTestUser(server));
  });
  afterAll(() => server.stop());
  it("Should create a user", async () => {
    const result = await createTestUser(server);
    expect(result.errors).toBeUndefined();
    delete result.data.addUser.__typename;
    expect(result.data.addUser).toEqual(userData);
  });

  it("Should update a user", async () => {
    await createTestUser(server);
    const user = { ...userData, name: "Max Mustermann" };
    const updateUser = gql`mutation($user: UpdateUserInput!) {
      updateUser(user: $user) {
        ${userProperties}
      }
    }`;

    const { data } = await server.mutate({
      mutation: updateUser,
      variables: { user },
    });
    const result = data.updateUser;
    delete result.__typename;
    expect(result).toEqual(user);
  });

  it("Should delete a user using the provided id", async () => {
    await createTestUser(server);
    const result = await deleteTestUser(server);
    expect(result.errors).toBeUndefined();
    delete result.data.deleteUser.__typename;
    expect(result.data.deleteUser).toEqual(userData);
  });
});
