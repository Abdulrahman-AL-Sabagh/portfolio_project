/** @format */

import { userData } from "test_data";
import { typeDefs, resolvers } from "pages/api/graphql/type-defs";
import { ApolloServer } from "apollo-server-micro";
import prisma from "@lib/prisma";

let server: ApolloServer;
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
dateOfBirth
aboutUser`;

describe("It should test the mutations", () => {
  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        db: prisma,
      },
    });
  });
  afterAll(async () => await server.stop());
  it("Should create a user", async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        db: prisma,
      },
    });
    const result = await server.executeOperation({
      variables: { user: userData },
      query: `mutation createUser($user:AddUserInput!) {
        addUser(user: $user) {
           ${userProperties}
        }
      }`,
    });
    console.log(result);
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual(userData);
  });
  it("Should find a user using the provided id ", async () => {
    const result = await server.executeOperation({
      query: `query findUser($id:ID!) {
          user(id: $id) {id , name}
        }`,
      variables: { id: userData.id },
      
    });
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual(userData);
  });
});
