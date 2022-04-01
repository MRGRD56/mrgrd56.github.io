import { useDispatch, useSelector } from '../../../reducers';
import getCurrentUser from '../../../actions/github/getCurrentUser';
import { UserData } from '../../../types/github';

const useGithubUser = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.github.currentUser);

    const getUser = async (): Promise<UserData> => {
        if (currentUser) {
            return currentUser;
        }

        return dispatch(getCurrentUser());
    };

    return { currentUser, getUser };
};

export default useGithubUser;
