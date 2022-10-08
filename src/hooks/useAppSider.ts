import { useMemo } from 'react';
import { SIDER_WIDTH } from '../constants/layout';

const useAppSider = () => {
    return useMemo(() => {
        const isSiderShown = window.innerWidth >= 992;

        return {
            isSiderShown,
            siderWidth: isSiderShown ? SIDER_WIDTH : 0
        };
    }, []);
};

export default useAppSider;
