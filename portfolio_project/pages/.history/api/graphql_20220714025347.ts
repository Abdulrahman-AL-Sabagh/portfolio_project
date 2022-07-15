import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

 new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"}).start()
