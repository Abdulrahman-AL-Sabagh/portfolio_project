/** @format */

import { gql } from "apollo-server";

const typeDefs = gql`
type Query {
  users(id: int)
}
`;
