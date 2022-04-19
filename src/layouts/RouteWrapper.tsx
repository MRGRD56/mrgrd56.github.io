import React, { FunctionComponent, useEffect } from 'react';

interface Props {
    title: string;
}

const RouteWrapper: FunctionComponent<Props> = ({ title, children }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return <>{children}</>;
};

export default RouteWrapper;
