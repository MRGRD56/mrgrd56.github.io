import { Octokit } from 'octokit';
import { GITHUB_TOKEN } from '../../constants/env';

const octokit = new Octokit({
    auth: GITHUB_TOKEN
});

export default octokit;
