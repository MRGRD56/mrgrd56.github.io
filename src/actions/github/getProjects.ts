import { AppThunkAction } from '../../reducers';
import { UserData } from '../../types/github';
import getUserRepositories from './api/getUserRepositories';
import { projectsLoaded } from '../../reducers/github';
import { DevProject } from '../../types';

const getGithubPagesRepositories = async (user: UserData | string) => {
    const repositories = await getUserRepositories(user);
    return repositories.filter((repository) => repository.has_pages);
};

interface Params {
    user: UserData;
}

const getProjects =
    ({ user }: Params): AppThunkAction<Promise<void>> =>
    async (dispatch) => {
        const repositories = await getGithubPagesRepositories(user);

        const projects: DevProject[] = repositories.map((value) => ({
            name: value.name,
            repoUrl: value.url,
            appUrl: value.homepage ?? undefined
        }));

        dispatch(projectsLoaded({ list: projects }));
    };

export default getProjects;
