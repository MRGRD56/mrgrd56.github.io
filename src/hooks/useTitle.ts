import useRouteContextEffect from './useRouteContextEffect';
import produceState from '../utils/produceState';

const useTitle = (title: string) => {
    useRouteContextEffect(
        (setRouteContentState) => {
            produceState(setRouteContentState, (context) => {
                context.title = title;
            });
        },
        [title]
    );
};

export default useTitle;
