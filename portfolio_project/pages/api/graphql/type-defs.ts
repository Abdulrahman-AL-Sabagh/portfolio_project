/** @format */

import { gql } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";
import { Context } from "@repos/prismaContext";
import mutation from "business/resolvers/mutation";
import userInteractor from "business/interactors/user_interactor";
import postInteractor from "business/interactors/post_interactor";
import taskInteractor from "business/interactors/task_interactor";
import listInteractor from "business/interactors/list_interactor";
import { DBContext, IdArgs } from "business/resolvers/resolver_types";
export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
    profileBackground: String
    birthday: Date
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
    userId: ID!
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
    userId: ID!
    title: String!
    tasks: [Task!]!
    color: String
    titleColor: String
  }
  type Task {
    id: ID!
    listId: ID!
    list: List!
    title: String!
    deadLine: String
    titleColor: String
    description: String
  }

  type Comment {
    id: ID!
    user: User!
    post: Post!
    userId: ID!
    postId: ID!
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
    deleteUser(id: ID!): User

    addPost(post: PostToAdd!): Post
    updatePost(post: PostToUpdate!): Post
    deletePost(id: ID!): Post

    addList(list: ListToAdd!): List
    updateList(list: ListToUpdate): List
    deleteList(id: ID!): List

    addTask(task: TaskToAdd!): Task
    updateTask(task: TaskToUpdate): Task
    deleteTask(id: ID!): Task

    addComment(comment: CommentToAdd!): Comment
    updateComment(comment: CommentToUpdate!): Comment
    deleteComment(id: ID!): Comment
  }
  input ListToAdd {
    id: ID
    userId: ID!
    title: String!
    titleColor: String
    color: String
  }
  input ListToUpdate {
    id: ID!
    userId: ID!
    titleColor: String
    title: String
    color: String
  }

  input CommentToAdd {
    id: ID
    userId: ID!
    postId: ID!
    publishedAt: Date
    content: String!
  }
  input CommentToUpdate {
    id: ID!
    userId: ID!
    postId: ID!
    publishedAt: Date
    content: String
  }

  input TaskToAdd {
    id: ID
    listId: ID!
    deadLine: Date
    title: String!
    description: String
    titleColor: String
  }
  input TaskToUpdate {
    id: ID!
    listId: ID
    deadLine: Date
    description: String
    title: String
    titleColor: String
  }

  input PostToAdd {
    id: ID
    userId: ID!
    title: String
    description: String!
    image: String
    publishedAt: Date
  }

  input PostToUpdate {
    id: ID!
    userId: ID
    title: String
    description: String
    image: String
    publishedAt: Date
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
    id: ID!
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
    user: async (_: never, { id }: IdArgs, { db }: DBContext) => {
      return await userInteractor.findOneById({ id, ctx: db });
    },
    post: async (_: never, args: { id: string }, { db }: DBContext) => {
      const post = await postInteractor.findOneById({ id: args.id, ctx: db });
      return post;
    },
    task: async (_: never, args: { id: string }, { db }: DBContext) => {
      return await taskInteractor.findOneById({ id: args.id, ctx: db });
    },
    list: async (_: never, args: { id: string }, ctx: Context) => {
      return await listInteractor.findOneById({ id: args.id, ctx });
    },
  },
  Mutation: mutation,
};

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return Date.parse(value); //  outgoing
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
