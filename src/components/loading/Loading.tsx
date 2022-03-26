import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.scss';

interface Props {
    spinning?: boolean;
}

const Loading: FunctionComponent<Props> = ({ spinning }) => {
    return <Spin spinning={spinning} className={styles.container} size="large" />;
};

export default Loading;
