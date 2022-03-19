import { Endpoints } from '@octokit/types';

export type UserData = Endpoints['GET /user']['response']['data'];

export type UserRepository = Endpoints['GET /users/{username}/repos']['response']['data'][0];
