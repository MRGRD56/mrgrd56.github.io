import React, { FunctionComponent } from 'react';
import Text from 'antd/lib/typography/Text';
import styles from './AppRouteCard.module.scss';
import Card from '../../../../components/card/Card';
import {
    getMenuItemRouterLink,
    getMenuItemTitle,
    SingleMenuItem
} from '../../../../layouts/appLayout/utils/routeMenuItems';
import ConstructionIcon from '@mui/icons-material/Construction';
import RouterLink from '../../../../components/RouterLink';

const DEFAULT_ICON = <ConstructionIcon />;

interface Props {
    item: SingleMenuItem;
}

const AppRouteCard: FunctionComponent<Props> = ({ item }) => {
    return (
        <RouterLink to={getMenuItemRouterLink(item)} className={styles.card}>
            <Card className={styles.cardInner}>
                <div className={styles.cardMainContainer}>
                    <div className={styles.cardIconWrapper}>
                        <div className={styles.cardIcon}>{item.largeIcon ?? DEFAULT_ICON}</div>
                    </div>
                    <Text strong className={styles.cardTitle}>
                        {getMenuItemTitle(item)}
                    </Text>
                </div>
                {item.description && (
                    <Text type="secondary" className={styles.cardDescription}>
                        {item.description}
                    </Text>
                )}
            </Card>
        </RouterLink>
    );
};

export default AppRouteCard;
