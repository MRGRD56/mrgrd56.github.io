import useAppSettings from './useAppSettings';
import useAppLocation from './useAppLocation';
import { useMemo } from 'react';
import { FOOTER_HEIGHT } from '../constants/layout';

const useAppFooter = () => {
    const { isFooterHidden } = useAppSettings();
    const appRoute = useAppLocation();

    const isFooterAnywayShown = appRoute?.isFooterAlwaysShown === true;
    const isFooterShown = !isFooterHidden || isFooterAnywayShown;

    return useMemo(
        () => ({
            isFooterShown,
            isFooterAnywayShown,
            footerHeight: isFooterShown ? FOOTER_HEIGHT : 0
        }),
        [isFooterShown, isFooterAnywayShown]
    );
};

export default useAppFooter;
