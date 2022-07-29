/** @format */
import { gql } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";

const typeDefs = gql`
  scalar Date

  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    avatar: String
    profileBackground: String
    dateOfBirth: Date
    job: String
    status: String
    aboutUser: String
    location: String
    gender: String
    posts: [Post!]!
    likes: [LikedPost!]!
    bookmarks: [BookmarkedPost!]!
    friends: [User!]!
    lists: [List!]!
  }

  type List {
    id: Int!
    user: User!
    title: String!
    tasks: [Task!]!
    color: String!
  }
  type Task {
    id: Int!
    title: String!
    description: String!
    deadLine: String!
    titleColor: String!
    list: List!
  }
  type Post {
    id: Int!
    userId: Int!
    title: String
    description: String!
    image: String
    publishedAt: Date!
    publishedBy: User!
    comments: [Comment!]!
    likes: [LikedPost!]!
    bookmarks: [BookmarkedPost!]!
  }
  type Comment {
    publishedBy: User!
    post: Post!
    publishedAt: Date!
    content: String!
  }
  type LikedPost {
    post: Post!
    user: User!
  }
  type BookmarkedPost {
    post: Post!
    user: User!
  }

  type Query {
    hello: String
    user(id: Int!): User!
    users: [User!]!
    posts: [Post!]!
    post(id: Int!): Post!
  }
  type Mutation {
    addUser(input: AddUserInput!): User!
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
    avatar: String
    profileBackground: String
    dateOfBirth: Date
    job: String
    status: String
    aboutUser: String
    location: String
    gender: String
  }
`;

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return new Date(value); //  outgoing
  },
  parseValue(value: any) {
    return new Date(value); //  incoming
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export default typeDefs;
