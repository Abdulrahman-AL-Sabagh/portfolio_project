import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { NextApiRequest, NextApiResponse } from 'next';

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [youResolver],
    });
    apolloServerHandler = new ApolloServer({ schema }).createHandler({
      path: '/api/graphql',
    });
  }
  return apolloServerHandler;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export const config = { api: { bodyParser: false } };