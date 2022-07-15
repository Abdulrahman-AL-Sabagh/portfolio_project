/** @format */

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./graphql/type-defs";
import users from "./graphql/users";
import Cors from "";
let resolvers = {
  Query: {
    users: () => users,
  },
};
const cors = Cors();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});
const startServer = server.start();
export default cors(async function handler(req, res) {
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
