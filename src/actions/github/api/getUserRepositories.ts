import { UserData, UserRepository } from '../../../types/github';
import octokit from '../../../utils/api/octokit';
import { isString } from 'lodash';
import fetchAllPages from '../../../utils/api/fetchAllPages';

const getUserRepositories = async (user: UserData | string): Promise<UserRepository[]> => {
    const username = isString(user) ? user : user.login;

    const fetchPage = async (page: number) => {
        const response = await octokit.request('GET /users/{username}/repos', {
            username,
            per_page: 999,
            page
        });
        return response.data as UserRepository[];
    };

    return await fetchAllPages(fetchPage);
};

export default getUserRepositories;
