import { Menu } from 'antd';
import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../constants/routes';

interface Props {
    route: AppRoute;
    icon?: ReactNode;
    title: ReactNode;
}

/**
 * Not working properly, use {@link renderRoute()} instead
 * @deprecated
 */
const RouteMenuItem: FunctionComponent<Props> = ({ route, icon, title }) => {
    const { path } = route;

    return (
        <Menu.Item icon={icon} key={path}>
            <Link to={path ?? ''}>{title}</Link>
        </Menu.Item>
    );
};

export default RouteMenuItem;
