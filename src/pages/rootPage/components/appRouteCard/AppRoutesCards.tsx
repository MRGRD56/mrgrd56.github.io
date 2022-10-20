import React, { FunctionComponent } from 'react';
import Flex from '../../../../components/flex/Flex';
import AppRouteCard from './AppRouteCard';
import styles from './AppRouteCard.module.scss';
import { SingleMenuItem } from '../../../../layouts/appLayout/utils/routeMenuItems';

interface Props {
    heading?: string;
    items: SingleMenuItem[];
}

const AppRoutesCards: FunctionComponent<Props> = ({ heading, items }) => {
    return (
        <Flex col gap={8}>
            {heading && <h2 className="mt-1 mb-0">{heading}</h2>}
            <div className={styles.list}>
                {items.map((item, index) => (
                    <AppRouteCard key={index} item={item} />
                ))}
            </div>
        </Flex>
    );
};

export default AppRoutesCards;
