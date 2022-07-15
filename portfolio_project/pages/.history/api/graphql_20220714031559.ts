import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./graphql/type-defs";
import users from "./graphql/users"
let resolvers = {
  Query: {
    users: () => {return users} ,
  },
};

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})
server.

  export const config = {
    api: {
      bodyParser: false,
    },
  };