/** @format */
import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    avatar: String
    profileBackground: String
    dateOfBirth: String
    job: String
    status: String
    aboutUser: String
    gender: String
    posts: [Post!]!
    likes: [LikedPost!]!
    bookmarks: [BookmarkedPost!]!
    friends: [Friend!]!
    lists: [List!]!
  }

  type Friend {
    user: User!
    friend: User!
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
    title: String
    description: String!
    image: String
    publishedAt: String!
    publishedBy: User!
    comments: [Comment!]!
    likes: [LikedPost!]!
    bookmarks: [BookmarkedPost!]!
  }
  type Comment {
    publishedBy: User!
    post: Post!
    publishedAt: String
    content: String
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
    friend: [Friend!]!
    lists(id: Int!): [List]!
    userPosts(id: Int!): [Post!]!
    posts: [Post!]!
    comments: [Comment!]!
    likedPosts: [LikedPost!]!
  }
`;

export default typeDefs;
