import { DevProject } from '../types';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { UserData } from '../types/github';

const actionCreator = actionCreatorFactory('GITHUB');

export interface GithubState {
    currentUser?: UserData;
    projects?: DevProject[];
}

const initialState: GithubState = {};

export const currentUserLoaded = actionCreator<{ currentUser: UserData }>('CURRENT_USER_LOADED');
export const projectsLoaded = actionCreator<{ projects: DevProject[] }>('PROJECTS_LOADED');

const github = reducerWithInitialState(initialState)
    .case(currentUserLoaded, (state, { currentUser }) => ({
        ...state,
        currentUser
    }))
    .case(projectsLoaded, (state, { projects }) => ({
        ...state,
        projects
    }));

export default github;
