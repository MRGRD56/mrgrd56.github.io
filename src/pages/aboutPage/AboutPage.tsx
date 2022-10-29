import React from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Col, Skeleton, Tag } from 'antd';
import packageJson from '../../../package.json';
import AppDependency from './components/AppDependency';
import mapObject from '../../utils/mapObject';
import Text from 'antd/lib/typography/Text';
import { ReactComponent as ReactLogo } from '../../assets/img/react-logo.svg';
import ExternalLink from '../../components/ExternalLink';
import Paragraph from 'antd/lib/typography/Paragraph';
import {
    CheckCircleOutlined,
    AntDesignOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    QuestionOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import useAsync from '../../hooks/useAsync';
import getDeployStatus from '../../hooks/api/github/getDeployStatus';
import styles from './AboutPage.module.scss';
import Flex from '../../components/flex/Flex';
import Switch from '../../utils/Switch';
import moment, { duration } from 'moment';

const AboutPage = () => {
    const {
        result: deployStatus,
        isLoading: isDeployStatusLoading,
        error: deployStatusError,
        invoke: refreshDeployStatus
    } = useAsync(getDeployStatus, { doInvokeOnMount: true });

    const deployStart = deployStatus && (deployStatus.runStartedAt ?? deployStatus?.createdAt);
    const deployFromStartDuration = deployStatus && (
        <>{duration(moment()?.diff(deployStatus.runStartedAt, 'seconds'), 'seconds').asSeconds()} s</>
    );
    const deployStatusDuration = deployStatus && (
        <>{duration(deployStatus.updatedAt?.diff(deployStatus.runStartedAt, 'seconds'), 'seconds').asSeconds()} s</>
    );

    return (
        <PageContainer title="About the app">
            <Col>
                <Text>
                    <Paragraph className="mb-1">
                        This app is created with{' '}
                        <ExternalLink href="https://github.com/facebook/react" className="ms-1">
                            <ReactLogo width={12} /> React
                        </ExternalLink>
                    </Paragraph>
                    <Paragraph>
                        The UI is built with{' '}
                        <ExternalLink href="https://ant.design" className="ms-1">
                            <AntDesignOutlined /> Ant Design
                        </ExternalLink>
                    </Paragraph>
                </Text>

                <h2>
                    <Flex row align="center" gap={6}>
                        <div>Deploy status</div>
                        {deployStatus && (
                            <Button
                                type="text"
                                icon={<ReloadOutlined />}
                                size="small"
                                className={styles.deployStatusRefreshButton}
                                onClick={refreshDeployStatus}
                            />
                        )}
                    </Flex>
                </h2>
                <Text>
                    {isDeployStatusLoading ? (
                        <Skeleton.Button className={styles.deployStatusSkeleton} size="small" />
                    ) : (
                        deployStatus && (
                            <Flex row gap={6} align="center">
                                {Switch.of(deployStatus.status)
                                    .onCases(['completed'], () => (
                                        <Text type={deployStatus?.conclusion === 'success' ? 'success' : undefined}>
                                            <CheckCircleOutlined />
                                        </Text>
                                    ))
                                    .onCases(['cancelled', 'failure', 'timed_out'], () => (
                                        <Text type="danger">
                                            <CloseCircleOutlined />
                                        </Text>
                                    ))
                                    .onCases(['in_progress', 'queued', 'requested', 'waiting'], () => (
                                        <Text type="warning">
                                            <ClockCircleOutlined />
                                        </Text>
                                    ))
                                    .onDefault(() => (
                                        <QuestionOutlined />
                                    ))}
                                <Text>
                                    <ExternalLink href={deployStatus.htmlUrl ?? undefined}>
                                        {deployStart?.fromNow() || 'Last deploy'}
                                    </ExternalLink>
                                </Text>
                                {deployStatus.status && (
                                    <Tag className="me-0">
                                        {deployStatus.status.replace(/_/, ' ')}
                                        {Switch.of(deployStatus.status)
                                            .onCases(['completed'], () => <> in {deployStatusDuration}</>)
                                            .onCases(['in_progress', 'queued', 'requested', 'waiting'], () => (
                                                <> for {deployFromStartDuration}</>
                                            ))
                                            .value()}
                                    </Tag>
                                )}
                                {deployStatus.conclusion && <Tag>{deployStatus.conclusion}</Tag>}
                            </Flex>
                        )
                    )}
                </Text>

                <h2 className="mt-2">Used packages</h2>
                <h3 className="mt-2">dependencies</h3>
                {mapObject(packageJson.dependencies, (key, value, index) => (
                    <AppDependency key={index} name={key} version={value} />
                ))}
                <h3 className="mt-2">devDependencies</h3>
                {mapObject(packageJson.devDependencies, (key, value, index) => (
                    <AppDependency key={index} name={key} version={value} />
                ))}
            </Col>
        </PageContainer>
    );
};

export default AboutPage;
