import React, { FunctionComponent } from 'react';
import { useDidMount } from 'rooks';

interface Props {
    url: string;
}

const ExternalRedirect: FunctionComponent<Props> = ({ url }) => {
    useDidMount(() => {
        window.location.href = url;
    });

    return null;
};

export default ExternalRedirect;
