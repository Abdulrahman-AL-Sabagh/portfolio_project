/** @format */
import prisma from "../../../lib/prisma";
const resolvers = {
  Query: {
    users: () => ([{
      id:1,
      name:"hi",
      email: ""
    }]),
  },
};

export default resolvers;
