import { ComponentType, ReactNode } from 'react';
import { isNil } from 'lodash';

// const renderComponent = <P,>(component: ComponentType<P> | null | undefined, ...props: (P extends {} ? [P?] : [P])): ReactNode => {
// function renderComponent(component: ComponentType | null | undefined): ReactNode;
// function renderComponent<P>(component: ComponentType<P> | null | undefined, props: P): ReactNode;
function renderComponent<P>(component: ComponentType<P> | null | undefined, props?: P): ReactNode {
    if (isNil(component)) {
        return component;
    }

    const Component = component;
    return <Component {...((props ?? {}) as P)} />;
}

export default renderComponent;
