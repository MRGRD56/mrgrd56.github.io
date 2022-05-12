import React, { FunctionComponent } from 'react';
import useQuery from '../../hooks/useQuery';
import styles from './DataUrlViewPage.module.scss';
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/router/routes';
import RouteWrapper from '../../layouts/RouteWrapper';

export interface DataUrlViewPageQueryParams {
    data?: string;
    title?: string;
}

const DataUrlViewPage: FunctionComponent = () => {
    const { data, title } = useQuery<DataUrlViewPageQueryParams>();

    if (!data) {
        return <Navigate to={routes.dataUrl.path} />;
    }

    return (
        //FIXME title is not displayed
        <RouteWrapper title={title ?? routes.dataUrlView.title}>
            <div className={styles.container}>
                <iframe className={styles.iframe} src={data} />
            </div>
        </RouteWrapper>
    );
};

export default DataUrlViewPage;
