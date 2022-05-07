import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import PageContainer, { PageContainerProps } from '../pageContainer/PageContainer';
import styles from './SingleConverterPageContainer.module.scss';

type Props = PageContainerProps;

const SingleConverterPageContainer: FunctionComponent<Props> = (props) => {
    const { title, titleExtra, children, className, noPadding, ...pageProps } = props;

    return (
        <PageContainer
            noPadding={noPadding ?? true}
            className={classNames(styles.pageContainer, className)}
            {...pageProps}
        >
            <Col className={styles.container}>
                <Row className={classNames(styles.titleContainer)}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {titleExtra}
                </Row>
                <Row className={classNames(styles.content)}>{children}</Row>
            </Col>
        </PageContainer>
    );
};

export default SingleConverterPageContainer;
