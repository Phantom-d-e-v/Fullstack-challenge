import { githubService } from "../services/github.service";

export const githubQueryResolver = {
  githubUser: ( username: string, searchType: string) => {
    return githubService.getUser(username, searchType);
  }
};
