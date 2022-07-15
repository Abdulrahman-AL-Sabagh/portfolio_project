import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";

let resolvers = {
  Query: {
    users: () => users,
  },
};

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})

