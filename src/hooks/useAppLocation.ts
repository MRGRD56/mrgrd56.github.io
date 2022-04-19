import { AppRoute, appRoutesList } from '../constants/router/routes';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useAppLocation = (): AppRoute => {
    const { pathname } = useLocation();

    return useMemo(() => appRoutesList.find((route) => route.path === pathname) as AppRoute, [pathname]);
};

export default useAppLocation;
