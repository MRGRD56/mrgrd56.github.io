import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './AppLoadingLayout.module.scss';
import classNames from 'classnames';
import { ReactComponent as PulseLoading } from '../../assets/img/pulse-loading.svg';

const AppLoadingLayout: FunctionComponent = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const handleReadyStateChange = () => {
            if (document.readyState === 'complete') {
                setIsLoaded(true);
            }
        };

        document.addEventListener('readystatechange', handleReadyStateChange);

        return () => {
            document.removeEventListener('readystatechange', handleReadyStateChange);
        };
    }, []);

    return (
        <>
            <div
                className={classNames(styles.loading, {
                    [styles.loaded]: isLoaded
                })}
            >
                <PulseLoading />
            </div>
            {children}
        </>
    );
};

export default AppLoadingLayout;
