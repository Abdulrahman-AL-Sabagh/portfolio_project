import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

const apolloServer = new ApolloServer({typeDefs,resolvers, csrfPrevention:true})
const startServer = apolloServer.start();
