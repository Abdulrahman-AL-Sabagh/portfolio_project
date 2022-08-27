/** @format */

import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCache,
} from "@apollo/client/core";

export const testServerConfig = {
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_API,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
} as unknown as ApolloClientOptions<NormalizedCache>;
