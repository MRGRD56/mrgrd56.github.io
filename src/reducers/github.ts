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
export const projectsLoaded = actionCreator<{ list: DevProject[] }>('PROJECTS_LOADED');

const github = reducerWithInitialState(initialState).case(projectsLoaded, (state, { list }) => ({
    projects: list
}));

export default github;
