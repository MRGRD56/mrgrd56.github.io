import React, { FunctionComponent } from 'react';
import { Space, Tag, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';

const RootPage: FunctionComponent = () => {
    return (
        <Typography>
            <Space size="small" direction="vertical">
                <Tag color="blue" icon={<ClockCircleOutlined />}>
                    Work In Progress
                </Tag>
                <Paragraph>
                    Hello! Maybe one day I will write something here 🙂 <br />
                    But you can check out other sections, look at the menu on the left!
                </Paragraph>
            </Space>
        </Typography>
    );
};

export default RootPage;
