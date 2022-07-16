import useAppSettings from './useAppSettings';
import useAppLocation from './useAppLocation';
import { useMemo } from 'react';
import { FOOTER_HEIGHT } from '../constants/layout';

const useAppFooter = () => {
    const { isFooterHidden } = useAppSettings();
    const appRoute = useAppLocation();

    return useMemo(() => {
        const isFooterAnywayShown = appRoute?.isFooterAlwaysShown === true;
        const isFooterShown = !isFooterHidden || isFooterAnywayShown;

        return {
            isFooterAnywayShown,
            isFooterShown,
            footerHeight: isFooterShown ? FOOTER_HEIGHT : 0
        };
    }, [appRoute, isFooterHidden]);
};

export default useAppFooter;
