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
  list:[List!]
}
type List{
  id: ID!
  title: String!
  titleColor: String!
  tasks: [Task!]
}

type Query {
  users(id: int)
}
`;
