/** @format */

import { ApolloClient } from "@apollo/client";
import { testServerConfig } from "test_data/test_config";
import { postData } from "test_data/test_data";
import {
  createTestPost,
  createTestUser,
} from "test_data/test_create_mutations";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { getTestUser } from "test_data/test_queries";
import { gql } from "apollo-server-micro";
import { postProperties } from "test_data/schema_peroperties";

let server: ApolloClient<any>;
describe("Comment query ", () => {
  beforeAll(() => (server = new ApolloClient(testServerConfig)));
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (userExists.data.user) await deleteTestUser(server);
    await createTestUser(server);
    await createTestPost(server);
  });
  afterEach(() => deleteTestUser(server));
  afterAll(() => server.stop);
  it("Should find a comment using the provided id", async () => {
    const query = gql`
    query Post($id: ID!) {
      post(id: $id) {
        ${postProperties}
      }
    }
  `;
    const { data } = await server.query({
      query,
      variables: { id: postData.id },
    });

    const result = data.post;
    result.publishedAt = new Date(result.publishedAt);
    expect(result).toEqual({ ...postData, __typename: result.__typename });
  });
});
