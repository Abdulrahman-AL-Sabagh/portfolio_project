import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/type-defs";
import users from "./graphql/users"
let resolvers = {
  Query: {
    users: () => {return users} ,
  },
};

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})
server.start();

  export const config = {
    api: {
      bodyParser: false,
    },
  };