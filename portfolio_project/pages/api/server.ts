/** @format */

import prisma from "@lib/prisma";
import { Context } from "@repos/prismaContext";
import { ApolloServer } from "apollo-server-micro/dist/ApolloServer";
import typeDefs, { resolvers } from "./graphql/type-defs";
const db: Context = { db: prisma };

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  allowBatchedHttpRequests: true,

  context: {
    db,
  },
});

export default server;
