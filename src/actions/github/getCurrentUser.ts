import { AppThunkAction } from '../../reducers';
import octokit from '../../utils/api/octokit';
import { currentUserLoaded } from '../../reducers/github';
import { UserData } from '../../types/github';

const getCurrentUser = (): AppThunkAction<Promise<UserData>> => async (dispatch) => {
    const { data } = await octokit.rest.users.getAuthenticated();
    dispatch(currentUserLoaded({ currentUser: data }));
    return data;
};

export default getCurrentUser;
