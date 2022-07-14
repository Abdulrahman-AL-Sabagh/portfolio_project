/** @format */

import { gql } from "apollo-server";

const typeDefs = gql`

type User {
  id: ID!
  name: String!
  email: String!
  password: String
  avatar: String
  profileBackgroundImage:String
  dateOfBirth: String
  status: String
  aboutUser: String
  gender:String
  friends: []
}
type Query {
  users(id: int)
}
`;
