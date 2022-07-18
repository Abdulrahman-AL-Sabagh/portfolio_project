/** @format */

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./graphql/type-defs";

import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const startServer = server.start();
export default async function handler(req, res) {
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
