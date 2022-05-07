import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useMutationObserver } from 'rooks';

interface Props {
    onContentChange: (transformingElement: Element, canvas: HTMLCanvasElement) => (() => void) | void;
    children?: ReactNode;
}

function CanvasRenderer({ onContentChange, children }: Props) {
    const childrenWrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleChildrenMutation = useCallback(() => {
        const { current } = childrenWrapperRef;

        if (!current) {
            return;
        }

        const transformingElement = current.children?.[0];

        if (!transformingElement) {
            return;
        }

        if (!canvasRef.current) {
            throw new Error('no canvas');
        }

        return onContentChange(transformingElement, canvasRef.current);
    }, [onContentChange]);

    useEffect(handleChildrenMutation, [handleChildrenMutation]);
    useMutationObserver(childrenWrapperRef, handleChildrenMutation);

    return (
        <>
            <canvas ref={canvasRef} />
            <div ref={childrenWrapperRef} className="d-none">
                {children}
            </div>
        </>
    );
}

export default CanvasRenderer;
