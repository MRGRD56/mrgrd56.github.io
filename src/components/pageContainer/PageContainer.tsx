import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import styles from './PageContainer.module.scss';
import { Space, SpaceProps, Tag } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';

export enum PageTag {
    WIP = 'WIP',
    NOT_WORKING = 'NOT_WORKING'
}

interface Props extends Omit<SpaceProps, 'title'> {
    title?: ReactNode;
    description?: ReactNode;
    titleExtra?: ReactNode;
    tags?: PageTag[];
}

const getTagNodes = (key: number | string): Readonly<Record<PageTag, ReactNode>> => ({
    [PageTag.WIP]: (
        <Tag color="blue" icon={<ClockCircleOutlined />} key={key}>
            Work In Progress
        </Tag>
    ),
    [PageTag.NOT_WORKING]: (
        <Tag color="red" icon={<WarningOutlined />} key={key}>
            Not Working
        </Tag>
    )
});

const renderTag = (tag: PageTag, index: number) => getTagNodes(index)[tag];

const PageContainer: FunctionComponent<Props> = ({ title, description, titleExtra, tags, children, ...props }) => {
    const renderedTags = useMemo(() => tags?.map(renderTag), [tags]);

    return (
        <Space direction="vertical" className={styles.container} {...props}>
            {tags?.length && <div>{renderedTags}</div>}
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
