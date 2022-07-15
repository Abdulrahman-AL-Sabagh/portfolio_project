import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

const apolloServer = new ApolloServer({typeDefs,resolvers})
const startServer = apolloServer.start();
export default async function 