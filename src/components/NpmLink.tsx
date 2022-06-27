import React, { FunctionComponent, ReactNode } from 'react';
import ExternalLink from './ExternalLink';
import getNpmPackageLink from '../utils/getNpmPackageLink';

interface Props {
    packageName: string;
    children?: ReactNode;
}

const NpmLink: FunctionComponent<Props> = ({ packageName, children }) => {
    const link = getNpmPackageLink(packageName);

    return (
        <ExternalLink href={link}>
            <code>{children || packageName}</code>
        </ExternalLink>
    );
};

export default React.memo(NpmLink);
