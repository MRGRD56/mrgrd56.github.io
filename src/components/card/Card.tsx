import React, { FunctionComponent, HTMLProps } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';

const Card: FunctionComponent<HTMLProps<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={classNames(styles.container, className)} {...props}>
            {children}
        </div>
    );
};

export default Card;
