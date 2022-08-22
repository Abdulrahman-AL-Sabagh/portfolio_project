/** @format */

import { gql } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";
import { Context } from "@repos/prismaContext";
import { User } from "@prisma/client";
import userInteractor from "business/interactors/user_interactor";
import postInteractor from "business/interactors/post_interactor";
import taskInteractor from "business/interactors/task_interactor";
import listInteractor from "business/interactors/list_interactor";

const typeDefs = gql`
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
    user(id: ID!): User!
    post(id: ID!): Post!
    list(id: ID!): List!
    task(id: ID!): Task!
  }
  type Mutation {
    addUser(user: AddUserInput!): User
    updateUser(user: AddUserInput!, id: ID!): User
    deleteUser(id: ID!): User
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

export const resolvers = {
  Query: {
    user: async (_: never, args: { id: string }, ctx: Context) =>
      await userInteractor.findOneById({ id: args.id, ctx }),
    post: (_: never, args: { id: string }, ctx: Context) =>
      postInteractor.findOneById({ id: args.id, ctx }),
    task: (_: never, args: { id: string }, ctx: Context) =>
      taskInteractor.findOneById({ id: args.id, ctx }),
    list: (_: never, args: { id: string }, ctx: Context) =>
      listInteractor.findOneById({ id: args.id, ctx }),
  },
  Mutation: {
    addUser: async (_: never, args: { user: User }, ctx: Context) => {
      console.log(args);
      const { error, data, message } = await userInteractor.create({
        data: args.user,
        ctx,
      });
      console.table({ error, data, message });
      return data;
    },
    updateUser: (_: never, args: { user: User }, ctx: Context) =>
      userInteractor.update({ data: args.user, ctx }),
    deleteUser: (_: never, args: { id: string }, ctx: Context) =>
      userInteractor.deleteOne({ id: args.id, ctx }),
  },
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
