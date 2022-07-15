/** @format */
import prisma from "../../../lib/prisma";
const resolvers = {
  Query: {
    users: () => ([{
      id:1,
      name:"hi",
      email: "a@b.c"
    }]),
  },
};

export default resolvers;
