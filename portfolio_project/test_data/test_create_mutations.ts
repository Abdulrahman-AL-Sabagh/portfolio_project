/** @format */

import { ApolloClient, gql } from "@apollo/client";
import {
  commentProperties,
  listProperties,
  postProperties,
  taskProperties,
  userProperties,
} from "./schema_peroperties";
import {
  userData,
  postData,
  listData,
  commentData,
  taskData,
} from "./test_data";

export function createTestUser(server: ApolloClient<any>) {
  const createUser = gql`mutation createUser($user:AddUserInput!) {
        addUser(user: $user) {
           ${userProperties}
        }
      }`;
  return server.mutate({ mutation: createUser, variables: { user: userData } });
}

export function createTestPost(server: ApolloClient<any>) {
  const createPost = gql`
    mutation addPost($post: PostToAdd!) {
      addPost(post: $post) {
      ${postProperties}
      }
    }
  `;
  return server.mutate({ mutation: createPost, variables: { post: postData } });
}

export function createTestList(server: ApolloClient<any>) {
  const createList = gql`
    mutation addList($list: ListToAdd!) {
      addList(list: $list) {
       ${listProperties}
      }
    }
  `;

  return server.mutate({ mutation: createList, variables: { list: listData } });
}

export function createTestComment(server: ApolloClient<any>) {
  const createComment = gql`
    mutation addComment($comment: CommentToAdd!) {
      addComment(comment: $comment) {
${commentProperties}
      }
    }
  `;
  return server.mutate({
    mutation: createComment,
    variables: { comment: commentData },
  });
}

export function createTestTask(server: ApolloClient<any>) {
  const createTask = gql`
    mutation AddTask($task: TaskToAdd!) {
      addTask(task: $task) {
        ${taskProperties}
      }
    }
  `;

  return server.mutate({ mutation: createTask, variables: { task: taskData } });
}
