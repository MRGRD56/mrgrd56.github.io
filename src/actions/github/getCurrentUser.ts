import { AppThunkAction } from '../../reducers';
import octokit from '../../utils/api/octokit';
import { currentUserLoaded } from '../../reducers/github';

const getCurrentUser = (): AppThunkAction<Promise<void>> => async (dispatch) => {
    const { data } = await octokit.rest.users.getAuthenticated();
    dispatch(currentUserLoaded({ currentUser: data }));
};

export default getCurrentUser;
