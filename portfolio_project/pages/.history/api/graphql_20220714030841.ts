import { ApolloServer } from 'apollo-server-express';
import { ApolloServer } from "ApolloServer";
import typeDefs from "./graphql/type-defs";

let resolvers = {
  Query: {
    users: () => users,
  },
};

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})
const startServer = server.start();
export default async function handler(req, res) {
    await startServer;
    await server.({
      path: "/api/graphql",
    })(req, res);
  }
  
  export const config = {
    api: {
      bodyParser: false,
    },
  };