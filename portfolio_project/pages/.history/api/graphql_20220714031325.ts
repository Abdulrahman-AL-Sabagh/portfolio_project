import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/type-defs";
import ""
let resolvers = {
  Query: {
    users: () => return ,
  },
};

const server =  new ApolloServer({typeDefs,resolvers, csrfPrevention:true, cache:"bounded"})
const startServer = server.start();
export default async function handler(req, res) {
    await startServer;
    await server.createHandler({
      path: "/api/graphql",
    })(req, res);
  }
  
  export const config = {
    api: {
      bodyParser: false,
    },
  };