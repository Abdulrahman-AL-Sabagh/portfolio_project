/** @format */

import { gql } from "apollo-server";


const typeDefs = gql`

type User {
  id: ID!

}
type List{
  id: ID!
  title: String!
  tasks: [Task!]!
  color: String!
}
type Task {
  id: ID!
  title: String!
  description: String!
  deadLine: String!
  titleColor: String!
}

type Query {
  users: [User!]
  
}
`;

export default typeDefs;
