import React from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from '../appMenu/AppMenu';

const AppSider = () => {
    return (
        <Sider theme="light" breakpoint="lg" collapsedWidth={0} trigger={null}>
            <AppMenu />
        </Sider>
    );
};

export default AppSider;
