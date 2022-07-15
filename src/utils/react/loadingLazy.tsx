import React, { ComponentProps, ComponentType, FunctionComponent, Suspense } from 'react';
import { Spin } from 'antd';

const fallback: JSX.Element = <Spin size="large" />;

const loadingLazy = <T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
): FunctionComponent<ComponentProps<T>> => {
    const LazyComponent = React.lazy(factory);

    return (props) => (
        <Suspense fallback={fallback}>
            <LazyComponent {...(props as any)} />
        </Suspense>
    );
};

export default loadingLazy;
