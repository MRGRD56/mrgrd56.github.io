import React, { CSSProperties, FunctionComponent, HTMLProps, useMemo } from 'react';
import { Switch, SwitchProps } from 'antd';
import { omit, pick } from 'lodash';
import styles from './LabeledSwitch.module.scss';
import classNames from 'classnames';

interface Props
    extends Omit<HTMLProps<HTMLLabelElement>, 'onChange' | 'onClick' | 'size' | 'label'>,
        Omit<SwitchProps, 'className' | 'style'> {
    switchClassName?: string;
    switchStyle?: CSSProperties;
}

const realSwitchPropsNames = [
    'prefixCls',
    'size',
    'checked',
    'defaultChecked',
    'onChange',
    'onClick',
    'checkedChildren',
    'unCheckedChildren',
    'disabled',
    'loading',
    'autoFocus',
    'title',
    'tabIndex',
    'id'
] as const;

const switchPropNames = [...realSwitchPropsNames, 'switchClassName', 'switchStyle'] as const;

const LabeledSwitch: FunctionComponent<Props> = ({ children, ...props }) => {
    const { switchProps, labelProps } = useMemo(() => {
        return {
            switchProps: {
                ...pick(props, realSwitchPropsNames),
                className: classNames(styles.switch, props.switchClassName),
                style: props.switchStyle
            },
            labelProps: {
                ...omit(props, switchPropNames),
                className: classNames(styles.label, props.className)
            }
        };
    }, [props]);

    return (
        <label {...labelProps}>
            <Switch {...switchProps} />
            {children}
        </label>
    );
};

export default LabeledSwitch;
