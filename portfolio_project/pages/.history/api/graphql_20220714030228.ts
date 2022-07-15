import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";

let resolvers = {
    Query: {
      users: () => users,
    },
  };
import resolvers from "./graphql/resolvers";

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})

