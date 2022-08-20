import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import styles from './AppRouteCard.module.scss';
import Card from '../../../../components/card/Card';
import { RouteMenuItem } from '../../../../layouts/appLayout/utils/routeMenuItems';

interface Props {
    item: RouteMenuItem;
}

const AppRouteCard: FunctionComponent<Props> = ({ item }) => {
    return (
        <Link to={item.route.path} className={styles.card}>
            <Card>
                {item.largeIcon}
                <Text strong>{item.title ?? item.route.title}</Text>
                <Text type="secondary">{item.description}</Text>
            </Card>
        </Link>
    );
};

export default AppRouteCard;
