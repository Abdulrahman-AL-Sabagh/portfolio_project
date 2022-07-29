/** @format */

import { ApolloServer } from "apollo-server-micro/dist/ApolloServer";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/type-defs";

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server;
