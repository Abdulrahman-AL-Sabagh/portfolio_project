/** @format */
import prisma from "../../../lib/prisma";
const resolvers = {
  Query: {
    users: () => users,
  },
};

export default {...resolvers};
