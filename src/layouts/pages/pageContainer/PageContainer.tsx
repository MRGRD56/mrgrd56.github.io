import React, { ReactNode, useMemo } from 'react';
import styles from './PageContainer.module.scss';
import { Space, SpaceProps, Tag } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export enum PageTag {
    WIP = 'WIP',
    NOT_WORKING = 'NOT_WORKING'
}

export interface PageContainerProps extends Omit<SpaceProps, 'title'> {
    contentRef?: React.Ref<HTMLDivElement>;
    contentClassName?: string;
    title?: ReactNode;
    description?: ReactNode;
    titleExtra?: ReactNode;
    tags?: PageTag[];
    noPadding?: boolean;
    noContentPadding?: boolean;
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

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>((props, ref) => {
    const {
        title,
        description,
        titleExtra,
        tags,
        noPadding,
        noContentPadding,
        children,
        className,
        contentClassName,
        contentRef,
        ...restProps
    } = props;

    const renderedTags = useMemo(() => tags?.map(renderTag), [tags]);

    return (
        <div
            ref={ref}
            className={classNames(
                styles.container,
                {
                    [styles.noPadding]: noPadding,
                    [styles.noContentPadding]: noContentPadding
                },
                className
            )}
            {...restProps}
        >
            {tags?.length && <div>{renderedTags}</div>}
            {title && (
                <Space direction="horizontal" size="middle" className={styles.headingContainer}>
                    <h1 className="mb-0">{title}</h1>
                    {titleExtra}
                </Space>
            )}
            {description && <Paragraph className="mb-2">{description}</Paragraph>}

            <div className={classNames(styles.contentContainer, contentClassName)} ref={contentRef}>
                {children}
            </div>
        </div>
    );
});

export default PageContainer;
