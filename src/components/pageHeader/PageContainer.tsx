import React, { FunctionComponent, ReactNode } from 'react';
import styles from './PageHeader.module.scss';
import { Space, SpaceProps, Tag } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { ClockCircleOutlined } from '@ant-design/icons';

interface Props extends Omit<SpaceProps, 'title'> {
    title?: ReactNode;
    description?: ReactNode;
    titleExtra?: ReactNode;
    wip?: boolean;
}

const PageContainer: FunctionComponent<Props> = ({ title, description, titleExtra, wip, children, ...props }) => {
    return (
        <Space direction="vertical" className={styles.container} {...props}>
            {wip && (
                <Tag color="blue" icon={<ClockCircleOutlined />}>
                    Work In Progress
                </Tag>
            )}
            {title && (
                <Space direction="horizontal" size="middle" className={styles.headingContainer}>
                    <h1 className="mb-0">{title}</h1>
                    {titleExtra}
                </Space>
            )}
            {description && <Paragraph>{description}</Paragraph>}

            {children}
        </Space>
    );
};

export default PageContainer;
