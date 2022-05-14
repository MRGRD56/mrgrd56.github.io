import React, { FunctionComponent, useEffect } from 'react';
import useQuery from '../../hooks/useQuery';
import styles from './DataUrlViewPage.module.scss';
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/router/routes';
import useRouteContext from '../../hooks/useRouteContext';
import useStateProducer from '../../hooks/useStateProducer';

export interface DataUrlViewPageQueryParams {
    data?: string;
    title?: string;
}

const DataUrlViewPage: FunctionComponent = () => {
    const { data, title } = useQuery<DataUrlViewPageQueryParams>();
    const [, setRouteContext] = useRouteContext();

    const produceRouteContext = useStateProducer(setRouteContext);

    if (!data) {
        return <Navigate to={routes.dataUrl.path} />;
    }

    useEffect(() => {
        produceRouteContext((routeContext) => {
            routeContext.title = title ?? routes.dataUrlView.title;
        });
    }, [title]);

    return (
        <div className={styles.container}>
            <iframe className={styles.iframe} src={data} />
        </div>
    );
};

export default DataUrlViewPage;
