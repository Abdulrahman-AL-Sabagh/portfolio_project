/** @format */

import { gql } from "apollo-server";

const typeDefs = gql`

type User {
  name: String!
  email: String!
  dateOfBirth: 
}
type Query {
  users(id: int)
}
`;
