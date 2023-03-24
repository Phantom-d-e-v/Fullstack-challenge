export const typeDefs = `#graphql

type getUser {
  name: String
  bio: String
  login: String
  email: String
  websiteUrl: String
  avatarUrl: String
}

type Query {
  githubUser: [getUser]
}
`;
