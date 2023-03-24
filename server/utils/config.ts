import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  githubPersonalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
};
