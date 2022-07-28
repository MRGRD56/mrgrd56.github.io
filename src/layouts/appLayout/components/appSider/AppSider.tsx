import React, { useLayoutEffect, useRef, useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from '../appMenu/AppMenu';
import styles from './AppSider.module.scss';
import { useWindowEventListener } from 'rooks';
import useResizeObserver from '../../../../hooks/useResizeObserver';
import useAppFooter from '../../../../hooks/useAppFooter';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../../../../constants/layout';
import useAppLocation from '../../../../hooks/useAppLocation';

interface ContainerScrollIndent {
    top: number;
    bottom: number;
    redundantHeight: number;
    totalHeight: number;
}

const AppSider = () => {
    const { footerHeight, isFooterAnywayShown } = useAppFooter();
    const appRoute = useAppLocation();

    const [containerScrollIndent, setContainerScrollIndent] = useState<ContainerScrollIndent>({
        top: HEADER_HEIGHT,
        bottom: 0,
        redundantHeight: footerHeight,
        totalHeight: document.body.getBoundingClientRect().height
    });

    const containerScrollWrapperRef = useRef<HTMLDivElement>(null);
    const siderRef = useRef<HTMLDivElement>(null);

    const updateContainerScrollIndent = () => {
        const containerScrollWrapper = containerScrollWrapperRef.current;
        const sider = siderRef.current;
        if (!containerScrollWrapper || !sider) {
            return;
        }

        const { y } = containerScrollWrapper.getBoundingClientRect();
        const { bottom } = sider.getBoundingClientRect();
        const { height: documentHeight } = document.body.getBoundingClientRect();

        const newContainerScrollIndent: ContainerScrollIndent = {
            top: Math.max(y, 0),
            bottom: bottom === 0 ? 0 : Math.max(documentHeight - bottom, 0),
            redundantHeight: footerHeight,
            totalHeight: document.body.getBoundingClientRect().height
        };

        setContainerScrollIndent(newContainerScrollIndent);
        // console.log('AppSider scroll', { newContainerScrollIndent, y, bottom, documentHeight });
    };

    useLayoutEffect(() => {
        updateContainerScrollIndent();
    }, [appRoute]);

    useResizeObserver(document.body, updateContainerScrollIndent);
    useResizeObserver(siderRef.current, updateContainerScrollIndent);
    useWindowEventListener('scroll', updateContainerScrollIndent);

    return (
        <Sider theme="light" className={styles.container} trigger={null} ref={siderRef}>
            <div
                className={styles.containerScrollWrapper}
                ref={containerScrollWrapperRef}
                style={{
                    // position: containerScrollIndent.bottom ? 'fixed' : 'sticky'
                    height: `calc(100vh - ${FOOTER_HEIGHT}px - ${isFooterAnywayShown ? HEADER_HEIGHT : 0}px)`
                }}
            >
                <div
                    data-simplebar=""
                    className={styles.containerScroll}
                    style={{
                        maxHeight: `calc(100vh - ${containerScrollIndent.top}px - ${containerScrollIndent.bottom}px)`
                        // top: `${containerScrollIndent.bottom}px`,
                        // width: containerScrollIndent.bottom ? '200px' : undefined
                    }}
                >
                    <AppMenu />
                </div>
            </div>
        </Sider>
    );
};

export default AppSider;
