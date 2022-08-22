/** @format */

import { gql } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";
import { Context } from "@repos/prismaContext";
import mutation from "business/resolvers/mutation";
import userInteractor from "business/interactors/user_interactor";
import postInteractor from "business/interactors/post_interactor";
import taskInteractor from "business/interactors/task_interactor";
import listInteractor from "business/interactors/list_interactor";
import toDomainValueParser from "business/parsers/parse_to_domain";
import toApiValuePrser from "business/parsers/parse_to_api";
export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
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
    likes: [Like!]!
    bookmarks: [Bookmark!]!
    friends: [User!]!
    lists: [List!]!
  }
  type Post {
    id: ID!
    user: User!
    title: String
    description: String!
    image: String
    publishedAt: Date!
    comments: [Comment!]!
    likes: [Like!]!
    bookmarks: [Bookmark!]!
  }

  type List {
    id: ID!
    user: User!
    title: String!
    tasks: [Task!]!
    color: String
    titleColor: String
  }
  type Task {
    id: ID!
    title: String!
    deadLine: String!
    list: List!
    titleColor: String
    description: String
  }

  type Comment {
    publishedBy: User!
    post: Post!
    publishedAt: Date!
    content: String!
  }
  type Like {
    post: Post!
    user: User!
  }
  type Bookmark {
    post: Post!
    user: User!
  }

  type Query {
    user(id: ID!): User
    post(id: ID!): Post!
    list(id: ID!): List!
    task(id: ID!): Task!
  }
  type Mutation {
    addUser(user: AddUserInput!): User
    updateUser(user: UpdateUserInput!): User
    deleteUser(id: String!): User
  }
  input UpdateUserInput {
    id: String!
    name: String
    email: String
    password: String
    job: String
    aboutUser: String
    avatar: String
    birthday: Date
    gender: String
    location: String
    profileBackground: String
    status: String
  }

  input AddUserInput {
    id: String
    name: String!
    email: String!
    password: String!
    job: String
    aboutUser: String
    avatar: String
    birthday: Date
    gender: String
    location: String
    profileBackground: String
    status: String
  }
`;

export const resolvers = {
  Query: {
    user: async (_: never, args, ctx) => {
      console.log({ args, ctx });
      const user = await userInteractor.findOneById({
        id: args.id,
        ctx: ctx.db,
      });
      console.table({ user });
      return user ? toApiValuePrser.apiUser(user) : null;
    },
    post: (_: never, args: { id: string }, ctx: Context) =>
      postInteractor.findOneById({ id: args.id, ctx }),
    task: (_: never, args: { id: string }, ctx: Context) =>
      taskInteractor.findOneById({ id: args.id, ctx }),
    list: (_: never, args: { id: string }, ctx: Context) =>
      listInteractor.findOneById({ id: args.id, ctx }),
  },
  Mutation: mutation,
};

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
