/** @format */

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { commentProperties } from "test_data/schema_peroperties";
import { testServerConfig } from "test_data/test_config";
import {
  createTestComment,
  createTestPost,
  createTestUser,
} from "test_data/test_create_mutations";
import { commentData } from "test_data/test_data";
import { deleteTestUser } from "test_data/test_delete_mutations";
import { getTestUser } from "test_data/test_queries";

let server: ApolloClient<any>;
describe("Comment mutation", () => {
  beforeAll(() => (server = new ApolloClient(testServerConfig)));
  beforeEach(async () => {
    const userExists = await getTestUser(server);
    if (userExists.data.user) await deleteTestUser(server);
    await createTestUser(server);
    await createTestPost(server);
  });
  afterEach(() => deleteTestUser(server));
  afterAll(() => server.stop());
  it("Should create a comment", async () => {
    const { data } = await createTestComment(server);
    const result = data.addComment;
    delete result?.__typename;
    result.publishedAt = new Date(result.publishedAt);
    expect(result).toEqual(commentData);
  });

  it("Should update a comment", async () => {
    await createTestComment(server);
    const comment = { ...commentData, content: "test content" };
    const updateComment = gql`
    mutation UpdateComment($comment: CommentToUpdate!) {
      updateComment(comment: $comment) {
      ${commentProperties}    
      }
    }`;
    const { data } = await server.mutate({
      mutation: updateComment,
      variables: { comment },
    });
    const result = data.__typename;
    delete result.__typename;
    result.publishedAt = new Date(result.publishedAt);
    expect(result).toEqual(comment);
  });
  it("Should delete a comment", async () => {
    await createTestComment(server);
    const deleteComment = gql`mutation deleteComment($id: ID!) {
      deleteComment(id: $id) {
         ${commentProperties}
      }
    }`;

    const { data } = await server.mutate({
      mutation: deleteComment,
      variables: { id: commentData.id },
    });
    const result = data.deleteComment;
    delete result?.__typename;
    result.publishedAt = new Date(result.publishedAt);
    expect(result).toEqual(commentData);
  });
});
