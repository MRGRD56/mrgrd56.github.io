import React, { FunctionComponent, useState } from 'react';
import { Spin } from 'antd';
import { useDidMount } from 'rooks';

const RouteLoading: FunctionComponent = () => {
    const [isSpinning, setIsSpinning] = useState<boolean>(false);

    useDidMount(() => {
        setTimeout(() => {
            setIsSpinning(true);
        }, 500);
    });

    if (!isSpinning) {
        return null;
    }

    return <Spin className="w-100 h-100 d-flex align-items-center justify-content-center" size="large" />;
};

export default RouteLoading;
