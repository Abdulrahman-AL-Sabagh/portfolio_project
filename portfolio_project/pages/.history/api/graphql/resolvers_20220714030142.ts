/** @format */
import prisma from "../../../lib/prisma";
let resolvers = {
  Query: {
    users: () => users,
  },
};

export default {...resolvers};
