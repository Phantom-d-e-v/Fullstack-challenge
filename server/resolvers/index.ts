import { githubQueryResolver } from "./github.resolver";

export const resolvers = {
  Query: {
    ...githubQueryResolver,
  },
};