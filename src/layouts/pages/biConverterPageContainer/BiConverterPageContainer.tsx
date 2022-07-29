import React, { FunctionComponent, ReactNode } from 'react';
import PageContainer, { PageContainerProps } from '../pageContainer/PageContainer';
import styles from './BiConverterPageContainer.module.scss';
import { Col, Row } from 'antd';
import classNames from 'classnames';

interface Props extends PageContainerProps {
    leftTitle?: ReactNode;
    rightTitle?: ReactNode;

    leftExtra?: ReactNode;
    rightExtra?: ReactNode;

    left?: ReactNode;
    right?: ReactNode;

    extra?: ReactNode;
}

const BiConverterPageContainer: FunctionComponent<Props> = (props) => {
    const {
        leftTitle,
        rightTitle,
        leftExtra,
        rightExtra,
        left,
        right,
        extra,
        children,
        className,
        noPadding,
        ...pageProps
    } = props;

    return (
        <PageContainer
            noPadding={noPadding ?? true}
            className={classNames(styles.pageContainer, className)}
            {...pageProps}
        >
            <Row className={styles.container}>
                <Col xs={12} className={classNames(styles.col, styles.colLeft)}>
                    <div className={styles.colHeader}>
                        <h3 className={styles.colTitle}>{leftTitle}</h3>
                        {leftExtra}
                    </div>
                    {left}
                </Col>
                <Col xs={12} className={classNames(styles.col, styles.colRight)}>
                    <div className={styles.colHeader}>
                        <h3 className={styles.colTitle}>{rightTitle}</h3>
                        {rightExtra}
                    </div>
                    {right}
                </Col>
                {extra}
            </Row>
            {children}
        </PageContainer>
    );
};

export default BiConverterPageContainer;
