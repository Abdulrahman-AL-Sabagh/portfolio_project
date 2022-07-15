/** @format */
import prisma from "../../../lib/prisma";
let resolvers = {
  Query: {
    users: () => users,
  },
};
resolvers = {...resolvers}
export default {...resolvers};
