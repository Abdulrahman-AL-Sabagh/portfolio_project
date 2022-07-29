/** @format */
import { NextApiResponse, NextApiRequest } from "next";
import server from "./server";

const startServer = server.start();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
