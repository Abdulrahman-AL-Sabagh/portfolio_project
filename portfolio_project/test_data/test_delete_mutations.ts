/** @format */

import { ApolloClient, gql } from "@apollo/client";
import { userProperties } from "./schema_peroperties";
import { listData, postData, userData } from "./test_data";

export function deleteTestUser(server: ApolloClient<any>) {
  const deleteUser = gql`mutation($id: ID!) {
      deleteUser(id: $id) {
        ${userProperties}
      }
    }`;
  return server.mutate({
    mutation: deleteUser,
    variables: { id: userData.id },
  });
}

export function deleteTestPost(server: ApolloClient<any>) {
  const deletePost = gql`
    mutation deletePost($id: ID!) {
      deletePost(id: $id) {
        id
        title
        image
        description
        publishedAt
      }
    }
  `;
  return server.mutate({
    mutation: deletePost,
    variables: { id: postData.id },
  });
}

export function deleteTestList(server: ApolloClient<any>) {
  const deleteList = gql`
    mutation deleteList($id: ID!) {
      deleteList(id: $id) {
        id
        color
        titleColor
        title
      }
    }
  `;
  return server.mutate({
    mutation: deleteList,
    variables: { id: listData.id },
  });
}
