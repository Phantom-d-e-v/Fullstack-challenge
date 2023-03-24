import { ApolloClient, InMemoryCache } from "@apollo/client";
import { appConfig } from "../utils/config";

export const apolloClient = new ApolloClient({
  uri: appConfig.apiBaseUrl,
  cache: new InMemoryCache(),
});
