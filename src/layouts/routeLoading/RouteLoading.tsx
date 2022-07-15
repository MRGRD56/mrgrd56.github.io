import React, { FunctionComponent } from 'react';
import { Spin } from 'antd';

const RouteLoading: FunctionComponent = () => {
    return <Spin className="w-100 h-100 d-flex align-items-center justify-content-center" size="large" />;
};

export default RouteLoading;
