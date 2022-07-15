import React, { FunctionComponent, HTMLProps } from 'react';
import classNames from 'classnames';

/** @deprecated Use <Text code/> instead */
const Code: FunctionComponent<HTMLProps<HTMLSpanElement>> = ({ className, children, ...props }) => {
    return (
        <code className={classNames('code', className)} {...props}>
            {children}
        </code>
    );
};

export default Code;
