import { RouterLinkType } from '../components/RouterLink';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useRouterNavigate = () => {
    const navigate = useNavigate();

    return useCallback(
        (routerLink: RouterLinkType): void => {
            if (routerLink.isExternal) {
                window.location.href = routerLink.link;
            } else {
                navigate(routerLink.link);
            }
        },
        [navigate]
    );
};

export default useRouterNavigate;
