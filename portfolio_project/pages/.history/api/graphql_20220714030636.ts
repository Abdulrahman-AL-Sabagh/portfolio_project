import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";

import resolvers from "./graphql/resolvers";

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})

