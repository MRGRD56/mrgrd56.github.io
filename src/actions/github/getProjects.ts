import { AppThunkAction } from '../../reducers';
import { UserData, UserRepository } from '../../types/github';
import getUserRepositories from './api/getUserRepositories';
import { projectsLoaded } from '../../reducers/github';
import { GithubDevProject } from '../../types';

const getGithubPagesRepositories = async (user: UserData | string) => {
    const repositories = await getUserRepositories(user);
    return repositories.filter((repository) => repository.has_pages);
};

const getGithubRepositoryAppUrl = (repo: UserRepository): string | undefined => {
    if (!repo.has_pages) {
        return undefined;
    }

    const repoFullName = repo.full_name;
    const match = /^(.+)\/(.+)$/.exec(repoFullName);
    if (!match) {
        return undefined;
    }
    const [, owner, repoName] = match;

    const pagesHostname = `${owner.toLowerCase()}.github.io`;
    const pagesBaseUrl = `https://${pagesHostname}/`;

    if (repoName.toLowerCase() === pagesHostname) {
        return pagesBaseUrl;
    }

    return pagesBaseUrl + repoName;
};

interface Params {
    user: UserData | string;
}

const getProjects =
    ({ user }: Params): AppThunkAction<Promise<void>> =>
    async (dispatch) => {
        const repositories = await getGithubPagesRepositories(user);

        const projects: GithubDevProject[] = repositories.map((value) => ({
            name: value.name,
            id: value.id,
            repoUrl: value.html_url,
            appUrl: getGithubRepositoryAppUrl(value),
            description: value.description ?? undefined,
            stars: value.stargazers_count
        }));

        dispatch(projectsLoaded({ projects: projects }));
    };

export default getProjects;
