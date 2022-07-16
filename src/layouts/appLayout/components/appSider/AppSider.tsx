import React, { useRef, useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from '../appMenu/AppMenu';
import styles from './AppSider.module.scss';
import classNames from 'classnames';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import { useWindowEventListener } from 'rooks';
import './AppSider.scss';

const AppSider = () => {
    const [containerScrollTopIndent, setContainerScrollTopIndent] = useState<number>(64);

    const containerScrollRef = useRef<HTMLDivElement>(null);

    useWindowEventListener('scroll', () => {
        const containerScroll = containerScrollRef.current;
        if (!containerScroll) {
            return;
        }

        const { y } = containerScroll.getBoundingClientRect();
        setContainerScrollTopIndent(Math.max(y, 0));
    });

    return (
        <Sider theme="light" className={classNames(styles.container, 'AppSider')} trigger={null}>
            <div
                data-simplebar=""
                className={styles.containerScroll}
                style={{
                    maxHeight: `calc(100vh - ${containerScrollTopIndent}px)`
                }}
                ref={containerScrollRef}
            >
                <AppMenu />
            </div>
        </Sider>
    );
};

export default AppSider;
