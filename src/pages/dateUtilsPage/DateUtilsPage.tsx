import React, { FunctionComponent } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Tabs } from 'antd';

import DateUtilsDifferenceTab from './components/differenceTab/DateUtilsDifferenceTab';

const DateUtilsPage: FunctionComponent = () => {
    return (
        <PageContainer title="Date utils">
            <Tabs>
                <Tabs.TabPane tab="Difference">
                    <DateUtilsDifferenceTab />
                </Tabs.TabPane>
            </Tabs>
        </PageContainer>
    );
};

export default DateUtilsPage;
