/** @format */

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { postData } from "test_data/test_data";
import {
  createTestPost,
  createTestUser,
} from "test_data/test_create_mutations";
import { getTestUser } from "test_data/test_queries";
import {
  deleteTestPost,
  deleteTestUser,
} from "test_data/test_delete_mutations";

jest.setTimeout(1000000);

let server: ApolloClient<any>;
describe("Post mutation", () => {
  beforeAll(async () => {
    server = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.NEXT_PUBLIC_API,
    });
    // await deleteUser(server);
  });
  afterAll(async () => {
    await deleteTestUser(server);
    server.stop();
  });
  beforeEach(async () => {
    const user = await getTestUser(server);
    if (user.data.user) await deleteTestUser(server);
    await createTestUser(server);
  });
  afterEach(async () => {
    await deleteTestUser(server);
  });

  it("Should create a post", async () => {
    const data = await (await createTestPost(server)).data;

    const result = data.addPost;
    result.publishedAt = new Date(result.publishedAt);
    delete result.__typename;

    expect(result).toEqual(postData);
    await deleteTestPost(server);
  });

  it("Should update a post", async () => {
    await createTestPost(server);
    const updatePost = gql`
      mutation updatePost($post: PostToUpdate!) {
        updatePost(post: $post) {
          id
          title
          publishedAt
          description
          image
          publishedAt
        }
      }
    `;
  });

  it("Should delete a post", async () => {
    await createTestPost(server);
    const { data } = await deleteTestPost(server);
    const result = data.deletePost;
    delete result.__typename;
    result.publishedAt = new Date(result.publishedAt);
    expect(result.id).toEqual(postData.id);
  });
});
