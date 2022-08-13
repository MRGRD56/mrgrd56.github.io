import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';
import styles from './Loading.module.scss';

interface Props {
    spinning?: boolean;
    delay?: number;
}

const Loading: FunctionComponent<Props> = ({ spinning, delay }) => {
    return <Spin spinning={spinning} className={styles.container} size="large" delay={delay} />;
};

export default Loading;
