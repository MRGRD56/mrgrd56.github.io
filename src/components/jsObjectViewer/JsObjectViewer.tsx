import React, { HTMLProps, ReactElement, useEffect, useRef } from 'react';
import { useDidMount } from 'rooks';
import LunaObjectViewer from 'luna-object-viewer';
import useAppTheme from '../../hooks/useAppTheme';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value' | 'children'> {
    value: unknown;
}

const JsObjectViewer = ({ value, ...props }: Props): ReactElement => {
    const { isDarkMode } = useAppTheme();

    const containerRef = useRef<HTMLDivElement>(null);
    const objectViewerRef = useRef<LunaObjectViewer>();

    useDidMount(() => {
        const container = containerRef.current;
        if (!container) {
            throw new Error('Cannot initialize JsObjectViewer: No container');
        }

        objectViewerRef.current = new LunaObjectViewer(container, {
            theme: isDarkMode ? 'dark' : 'light',
            accessGetter: true,
            unenumerable: true
        });
    });

    useEffect(() => {
        const objectViewer = objectViewerRef.current;
        if (!objectViewer) {
            return;
        }

        objectViewer.set(value);
        console.log({ objectViewer });
    }, [value]);

    useEffect(() => {
        const objectViewer = objectViewerRef.current;
        if (!objectViewer) {
            return;
        }

        objectViewer.setOption('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return <div ref={containerRef} {...props} />;
};

export default JsObjectViewer;
