import React, { FunctionComponent, HTMLProps } from 'react';
import styles from './JbLayout.module.scss';
import classNames from 'classnames';

export interface JbLayoutProps extends HTMLProps<HTMLDivElement> {}

const JbLayout: FunctionComponent<JbLayoutProps> = ({ className, ...props }) => {
    return <div className={classNames(styles.container, className)} {...props} />;
};

export default JbLayout;
