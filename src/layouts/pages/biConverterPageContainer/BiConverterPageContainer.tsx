import React, { FunctionComponent, ReactNode } from 'react';
import PageContainer, { PageContainerProps } from '../pageContainer/PageContainer';
import styles from './BiConverterPageContainer.module.scss';
import { Col, Row } from 'antd';
import classNames from 'classnames';

interface Props extends PageContainerProps {
    leftTitle?: ReactNode;
    rightTitle?: ReactNode;

    leftTitleExtra?: ReactNode;
    rightTitleExtra?: ReactNode;

    left?: ReactNode;
    right?: ReactNode;

    extra?: ReactNode;

    noHeader?: boolean;
    noRight?: boolean;

    leftColSize?: number;
}

const BiConverterPageContainer: FunctionComponent<Props> = (props) => {
    const {
        leftTitle,
        rightTitle,
        leftTitleExtra,
        rightTitleExtra,
        left,
        right,
        extra,
        children,
        className,
        noPadding,
        noHeader,
        noRight,
        leftColSize = 12,
        ...pageProps
    } = props;

    return (
        <PageContainer
            noPadding={noPadding ?? true}
            className={classNames(styles.pageContainer, className)}
            {...pageProps}
        >
            <Row className={styles.container}>
                <Col
                    xs={noRight ? 24 : leftColSize}
                    className={classNames(styles.col, styles.colLeft, noRight && styles.colLeftNoRight)}
                >
                    {!noHeader && (
                        <div className={styles.colHeader}>
                            <h3 className={styles.colTitle}>{leftTitle}</h3>
                            {leftTitleExtra}
                        </div>
                    )}
                    {noRight ? <Col xs={leftColSize}>{left}</Col> : left}
                </Col>
                {!noRight && (
                    <Col xs={24 - leftColSize} className={classNames(styles.col, styles.colRight)}>
                        {!noHeader && (
                            <div className={styles.colHeader}>
                                <h3 className={styles.colTitle}>{rightTitle}</h3>
                                {rightTitleExtra}
                            </div>
                        )}
                        {right}
                    </Col>
                )}
                {extra}
            </Row>
            {children}
        </PageContainer>
    );
};

export default BiConverterPageContainer;
