import React, { FunctionComponent, useEffect } from 'react';
import useAppSettings from '../hooks/useAppSettings';
import call from '../utils/call';
import appendScript from '../utils/appendScript';

const eruda = () => (window as any).eruda;

const firstInitEruda = async () => {
    return await appendScript({
        src: '//cdn.jsdelivr.net/npm/eruda'
    });
};

const ErudaLayout: FunctionComponent = ({ children }) => {
    const { isErudaEnabled } = useAppSettings();

    useEffect(() => {
        call(async () => {
            if (isErudaEnabled) {
                if (!eruda()) {
                    await firstInitEruda();
                }

                eruda().init();
            } else {
                eruda()?.destroy();
            }
        });
    }, [isErudaEnabled]);

    return <>{children}</>;
};

export default ErudaLayout;
