import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useMutationObserver } from 'rooks';

const xmlSerializer = new XMLSerializer();

const SvgImage: FunctionComponent = ({ children }) => {
    const childrenWrapperRef = useRef<HTMLDivElement>(null);

    const [svgSource, setSvgSource] = useState<string>();

    const handleChildrenMutation = useCallback(() => {
        const { current } = childrenWrapperRef;

        if (!current) {
            return;
        }

        const svgElement = current.querySelector('svg');

        if (!svgElement) {
            return;
        }

        const svgString = xmlSerializer.serializeToString(svgElement);
        const svgBase64 = window.btoa(svgString);
        const svgSource = 'data:image/svg+xml;base64,' + svgBase64;
        setSvgSource(svgSource);
    }, []);

    useEffect(handleChildrenMutation, []);
    useMutationObserver(childrenWrapperRef, handleChildrenMutation);

    return (
        <>
            <div ref={childrenWrapperRef} className="d-none">
                {children}
            </div>
            <img src={svgSource} />
        </>
    );
};

export default SvgImage;
