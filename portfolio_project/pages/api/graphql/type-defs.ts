/** @format */
import UserRepository from "@repos/UserRepository";
import { gql } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";
import prisma from "@lib/prisma";
import PostRepository from "@repos/PostRepository";
import CommentRepository from "@repos/CommentRepository";
import TaskRepository from "@repos/TaskRepository";
import ListRepository from "@repos/ListRepository";
import { Context } from "@repos/prismaContext";
import { User } from "@prisma/client";

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
  type Mutation{
    addUser:(user:AddUserInput!): User
    updateUser:(user:AddUserInput!, id: ID!): User
    deleteUser:(id:ID!): User
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
    user: (_: never, args: { id: string }, ctx: { db: Context }) =>
      UserRepository.findOne(args.id, ctx.db),
    post: (_: never, args: { id: string }, ctx: { db: Context }) =>
      PostRepository.findOne(args.id, ctx.db),
    task: (_: never, args: { id: string }, ctx: { db: Context }) =>
      TaskRepository.findOne(args.id, ctx.db),
    list: (_: never, args: { id: string }, ctx: { db: Context }) =>
      ListRepository.findOne(args.id, ctx.db),
  },
  Mutation: {
    addUser: (_: never, args: { user: User }, ctx: { db: Context }) =>
      UserRepository.create(args.user, ctx.db),
    updateUser: (_: never, args: { user: User }, ctx: { db: Context }) =>
      UserRepository.update(args.user, ctx.db),
    deleteUser: (_: never, args: { id: string }, ctx: { db: Context }) =>
      UserRepository.deleteOne(args.id, ctx.db),
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
