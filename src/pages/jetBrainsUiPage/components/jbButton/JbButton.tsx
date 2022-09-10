import React, { FunctionComponent, HTMLProps } from 'react';
import classNames from 'classnames';
import styles from './JbButton.module.scss';

export type JbButtonType = 'default' | 'primary';

export interface JbButtonProps extends HTMLProps<HTMLButtonElement> {
    type?: JbButtonType;
}

const JbButton: FunctionComponent<JbButtonProps> = ({ type, className, ...props }) => {
    return <button className={classNames(styles.button, type === 'primary' && styles.primary, className)} {...props} />;
};

export default JbButton;
