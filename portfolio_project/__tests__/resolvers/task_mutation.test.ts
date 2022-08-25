/** @format */

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

let server: ApolloClient<any>;

describe("List mutation", () => {
  beforeAll(() => {
    server = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.NEXT_PUBLIC_API,
    });
  });
  it("Should create a task", async () => {});
  it("Should update a task", async () => {});
  it("Should delete a task", async () => {});
});
