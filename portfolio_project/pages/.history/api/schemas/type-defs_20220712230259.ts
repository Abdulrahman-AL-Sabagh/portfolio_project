/** @format */

import { gql } from "apollo-server";

const typeDefs = gql`

type User {
  name: String!
  email: String!
  password: String
  dateOfBirth: String
  status: String
  aboutUser: String

}
type Query {
  users(id: int)
}
`;
