import { Octokit } from "octokit"
import { appConfig } from "../utils/config";

const octokit = new Octokit({
  auth: `${appConfig.githubPersonalAccessToken}`
});

export const githubService = {
  async getUser(username: string, searchType: string) {
    try{
      if(searchType === "username"){
      const queryString =  `${username} in:login type:user`
      let data = await octokit.request('GET /search/users', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q : queryString,
        per_page: 10
      })
      return data
    }
    else if(searchType === "email"){
      const queryString =  `${username} in:email type:user`
      let data = await octokit.request('GET /search/users', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q : queryString,
        per_page: 10
      })
      return data
    }
    else if (searchType === "name"){
      const queryString =  `${username} in:name type:user`
      let data = await octokit.request('GET /search/users', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        q : queryString,
        per_page: 10
      })
      return data
    }
    } catch (error) {
      return error
    }
  },
};
