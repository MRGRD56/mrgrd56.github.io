import React, { FunctionComponent } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import Text from 'antd/lib/typography/Text';
import { Button, Col, notification, Row, Skeleton, Space, Tag, Tooltip } from 'antd';
import styles from './UserInfoPage.module.scss';
import useAsync from '../../hooks/useAsync';
import getUserInfo from '../../actions/ipapi.co/api/getUserInfo';
import getErrorMessage from '../../utils/getErrorMessage';
import ExternalLink from '../../components/ExternalLink';
import getScreenSize from '../../utils/getScreenSize';
import getScaledScreenSize from '../../utils/getScaledScreenSize';
import { ReloadOutlined } from '@ant-design/icons';
import Flex from '../../components/flex/Flex';

const UserInfoPage: FunctionComponent = () => {
    const {
        result: userIpInfo,
        isLoading: isUserIpInfoLoading,
        error: userIpInfoError,
        invoke: fetchUserInfo
    } = useAsync(getUserInfo, {
        doInvokeOnMount: true,
        onError: (error) => {
            console.error(error);
            notification.error({
                message: 'An error occurred while getting the IP address',
                description: getErrorMessage(error)
            });
        },
        onSuccess: console.log
    });

    const browserLanguages = window.navigator.languages;
    const realScreenSize = getScaledScreenSize();
    const screenSize = getScreenSize();
    const scale = window.devicePixelRatio;
    const screenOrientation = window.screen.orientation.type;

    return (
        <PageContainer
            title={
                <Flex row gap={3}>
                    <div>User Info</div>
                    <Button size="small" type="link" onClick={fetchUserInfo}>
                        <ReloadOutlined />
                    </Button>
                </Flex>
            }
        >
            <Col className={styles.container}>
                {!userIpInfoError && (
                    <Space direction="vertical" className="mb-2">
                        {isUserIpInfoLoading ? (
                            <>
                                <Skeleton.Input active className={styles.ipAddressSkeleton} />
                                <Skeleton.Input active className={styles.locationSkeleton} />
                                <Skeleton.Input active className={styles.ipDataProviderSkeleton} />
                            </>
                        ) : (
                            userIpInfo && (
                                <>
                                    <Text strong className={styles.ipAddress}>
                                        <Text strong>IP: </Text>
                                        <Text copyable>{userIpInfo.ip}</Text>
                                    </Text>
                                    <Text className="d-flex align-items-center">
                                        <Text strong>Location:</Text>
                                        <img
                                            className="ms-2"
                                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${userIpInfo.country}.svg`}
                                            alt={userIpInfo.country}
                                            height={12}
                                            width={18}
                                        />
                                        <Text className="ms-1">
                                            {userIpInfo.countryName}, {userIpInfo.city}
                                        </Text>
                                    </Text>
                                    <Text type="secondary">
                                        The data is provided by{' '}
                                        <ExternalLink href="https://ipapi.co/">ipapi.co</ExternalLink>
                                    </Text>
                                </>
                            )
                        )}
                    </Space>
                )}
                <Text>
                    <Text strong>Browser languages:</Text>
                    <Text className="ms-2">
                        {browserLanguages.map((language, index) =>
                            index === 0 ? (
                                <Tooltip title="Your primary language" placement="bottom">
                                    <Tag color="gold">{language}</Tag>
                                </Tooltip>
                            ) : (
                                <Tag color="default">{language}</Tag>
                            )
                        )}
                    </Text>
                </Text>
                <Text>
                    <Text strong>Screen size:</Text>
                    <Text className="ms-2">
                        {realScreenSize.width}x{realScreenSize.height}
                    </Text>
                    {scale !== 1 && (
                        <Text className="ms-1" type="secondary">
                            ({screenSize.width}x{screenSize.height} * {scale})
                        </Text>
                    )}
                </Text>
                <Text>
                    <Text strong>Pixel ratio:</Text>
                    <Text className="ms-2">{scale}</Text>
                </Text>
                <Text>
                    <Text strong>Orientation:</Text>
                    <Text className="ms-2">{screenOrientation}</Text>
                </Text>
            </Col>
        </PageContainer>
    );
};

export default UserInfoPage;
