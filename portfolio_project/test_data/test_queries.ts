/** @format */

import { ApolloClient, gql } from "@apollo/client";
import { userData } from "./test_data";

const userProperties = `id
name
email
password
job
location
status
gender
avatar
profileBackground
birthday
aboutUser`;
export function getTestUser(server: ApolloClient<any>) {
  const getUser = gql`query getUser($id: ID!) {
        user(id: $id) {
            ${userProperties}
        }
    }`;
  return server.query({ query: getUser, variables: { id: userData.id } });
}
