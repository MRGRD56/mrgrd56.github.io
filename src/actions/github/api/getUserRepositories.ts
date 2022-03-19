import { UserData, UserRepository } from '../../../types/github';
import octokit from '../../../utils/api/octokit';
import { isString } from 'lodash';

const getUserRepositories = async (user: UserData | string) => {
    const username = isString(user) ? user : user.login;

    const response = await octokit.request('GET /users/{username}/repos', {
        username,
        per_page: 999
    });

    return response.data as UserRepository[];
};

export default getUserRepositories;
