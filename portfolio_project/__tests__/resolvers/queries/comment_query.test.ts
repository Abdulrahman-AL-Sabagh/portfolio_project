/** @format */
import { commentData } from "test_data/test_data";
import { ApolloClient, gql } from "@apollo/client";
import {
  createTestUser,
  createTestPost,
  createTestComment,
} from "test_data/test_create_mutations";
import { testServerConfig } from "test_data/test_config";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { getTestUser } from "test_data/test_queries";
import { commentProperties } from "test_data/schema_peroperties";

let server: ApolloClient<any>;
describe("Comment query", () => {
  beforeAll(() => (server = new ApolloClient(testServerConfig)));
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (userExists.data.user) await deleteTestUser(server);
    await createTestUser(server);
    await createTestPost(server);
  });
  afterEach(() => deleteTestUser(server));
  afterAll(() => server.stop());
  it("Should find a comment using the provided id", async () => {
    await createTestComment(server);
    const findPost = gql`query Comment($id: ID!) {
    comment(id: $id) {
      ${commentProperties}
    }
  }`;
    const { data } = await server.query({
      query: findPost,
      variables: { id: commentData.id },
    });
    const result = data.comment;
    result.publishedAt = new Date(result.publishedAt);
    expect(result).toEqual({ ...commentData, __typename: result.__typename });
  });
});
