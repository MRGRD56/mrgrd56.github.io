import React, { HTMLProps, useEffect, useRef } from 'react';
import classNames from 'classnames';

interface Props extends HTMLProps<HTMLDivElement> {
    ref?: React.RefObject<HTMLDivElement>;
}

const Focused = React.forwardRef<HTMLDivElement, Props>(({ tabIndex, className, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>();

    const wasFocusedRef = useRef<boolean>(false);

    useEffect(() => {
        if (wasFocusedRef.current) {
            return;
        }

        if (divRef.current) {
            divRef.current.focus();
            wasFocusedRef.current = true;
        }
    }, []);

    const actualRef = (div: HTMLDivElement) => {
        divRef.current = div;

        if (ref) {
            if ('current' in ref) {
                ref.current = div;
            } else {
                ref(div);
            }
        }
    };

    return (
        <div
            {...props}
            tabIndex={tabIndex ?? 0}
            ref={actualRef}
            className={classNames('focus-visible-unstyled', className)}
        />
    );
});

export default Focused;
