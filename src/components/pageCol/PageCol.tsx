import React, { FunctionComponent, useMemo } from 'react';
import { Col, ColProps } from 'antd';
import styles from './PageCol.module.scss';
import classNames from 'classnames';
import TupleToUnion from '../../types/common/TupleToUnion';
import { defaults, pick } from 'lodash';

type Props = ColProps;

const sizePropNames = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

type SizeProps = Pick<ColProps, TupleToUnion<typeof sizePropNames>>;

const sizePropsDefaults: Record<'default', SizeProps> = {
    default: {
        xs: 24,
        md: 18,
        lg: 14,
        xl: 10,
        xxl: 8
    }
};

const PageCol: FunctionComponent<Props> = ({ className, children, ...props }) => {
    const restProps = useMemo(() => {
        const overriddenSizeProps = pick(props, sizePropNames);

        return {
            ...props,
            ...defaults(overriddenSizeProps, sizePropsDefaults.default)
        };
    }, [props]);

    return (
        <Col className={classNames(styles.container)} {...restProps}>
            {children}
        </Col>
    );
};

export default PageCol;
