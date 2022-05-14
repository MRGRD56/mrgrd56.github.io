import { useContext, useMemo } from 'react';
import RouteContext from '../context/RouteContext';

const useRouteContext = () => useContext(RouteContext);

export const useRouteContextState = () => {
    const { state } = useRouteContext();

    return useMemo(() => state, [state]);
};

export default useRouteContext;
