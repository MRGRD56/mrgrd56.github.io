import useAppSettings from './useAppSettings';
import useAppLocation from './useAppLocation';
import { routes } from '../constants/router/routes';
import { useMemo } from 'react';

const useAppFooter = () => {
    const { isFooterHidden } = useAppSettings();
    const appRoute = useAppLocation();

    const isFooterShown = !isFooterHidden || appRoute === routes.root;

    return useMemo(
        () => ({
            isFooterShown,
            footerHeight: isFooterShown ? 76 : 0
        }),
        [isFooterShown]
    );
};

export default useAppFooter;
