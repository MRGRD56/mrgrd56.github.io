import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useMutationObserver } from 'rooks';

interface Props {
    transform: (element: Element) => ReactNode;
    children?: ReactNode;
}

function ContentTransformer({ transform, children }: Props) {
    const childrenWrapperRef = useRef<HTMLDivElement>(null);

    const [transformedElement, setTransformedElement] = useState<ReactNode>();

    const handleChildrenMutation = useCallback(() => {
        const { current } = childrenWrapperRef;

        if (!current) {
            return;
        }

        const transformingElement = current.children?.[0];

        if (!transformingElement) {
            return;
        }

        setTransformedElement(transform(transformingElement));
    }, [transform]);

    useEffect(handleChildrenMutation, [handleChildrenMutation]);
    useMutationObserver(childrenWrapperRef, handleChildrenMutation);

    return (
        <>
            {transformedElement}
            <div ref={childrenWrapperRef} className="d-none">
                {children}
            </div>
        </>
    );
}

export default ContentTransformer;
