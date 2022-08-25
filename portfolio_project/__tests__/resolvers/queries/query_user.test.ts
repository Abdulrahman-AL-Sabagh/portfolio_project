/** @format */

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { userData } from "test_data/test_data";
import { createTestUser } from "test_data/test_create_mutations";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { getTestUser } from "test_data/test_queries";
/** @format */
let server: ApolloClient<any>;

describe("All get user functinos in the root query", () => {
  beforeAll(() => {
    server = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.NEXT_PUBLIC_API,
    });
  });
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (!userExists.data.user) {
      const user = await createTestUser(server);
      console.log(user);
    } else {
      await deleteTestUser(server);
      const user = await createTestUser(server);
      console.log(user);
    }
  });
  afterEach(async () => await deleteTestUser(server));
  it("Should find a user using the provided id ", async () => {
    const { data } = await getTestUser(server);
    const result = data.user;
    expect(result).toEqual({ ...userData, __typename: "User" });
  });
});
