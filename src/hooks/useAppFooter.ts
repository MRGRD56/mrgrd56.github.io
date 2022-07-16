import useAppSettings from './useAppSettings';
import useAppLocation from './useAppLocation';
import { useMemo } from 'react';

const useAppFooter = () => {
    const { isFooterHidden } = useAppSettings();
    const appRoute = useAppLocation();

    const isFooterAnywayShown = appRoute?.isFooterAlwaysShown === true;
    const isFooterShown = !isFooterHidden || isFooterAnywayShown;

    return useMemo(
        () => ({
            isFooterShown,
            isFooterAnywayShown,
            footerHeight: isFooterShown ? 76 : 0
        }),
        [isFooterShown, isFooterAnywayShown]
    );
};

export default useAppFooter;
