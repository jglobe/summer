import { Octokit } from 'octokit';

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

export async function getUser({ username }) {
  const user = await octokit.request('GET /users/{username}', { username });
  return user.data;
}

export async function getRepositories({ username, page, perPage = 4 }) {
  const repositories = await octokit.request('GET /users/{username}/repos', {
    username,
    page,
    per_page: perPage,
  });
  return repositories.data;
}
