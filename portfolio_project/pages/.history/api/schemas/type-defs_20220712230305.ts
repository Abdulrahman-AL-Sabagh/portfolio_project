/** @format */

import { gql } from "apollo-server";

const typeDefs = gql`

type User {
  name: String!
  email: String!
  password: String
  avatar: Strig
  dateOfBirth: String
  status: String
  aboutUser: String

}
type Query {
  users(id: int)
}
`;
