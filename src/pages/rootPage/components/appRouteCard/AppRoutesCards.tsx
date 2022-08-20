import React, { FunctionComponent } from 'react';
import Flex from '../../../../components/flex/Flex';
import AppRouteCard from './AppRouteCard';
import styles from './AppRouteCard.module.scss';
import { RouteMenuItem } from '../../../../layouts/appLayout/utils/routeMenuItems';

interface Props {
    heading: string;
    items: RouteMenuItem[];
}

const AppRoutesCards: FunctionComponent<Props> = ({ heading, items }) => {
    return (
        <Flex col gap={8}>
            <h2 className="mt-1 mb-0">{heading}</h2>
            <div className={styles.list}>
                {items.map((item) => (
                    <AppRouteCard item={item} />
                ))}
            </div>
        </Flex>
    );
};

export default AppRoutesCards;
