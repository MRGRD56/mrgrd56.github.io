import React, { FunctionComponent, ReactNode } from 'react';
import ExternalLink from './ExternalLink';
import getNpmPackageLink from '../utils/getNpmPackageLink';

interface Props {
    packageName: string;
    plain?: boolean;
    children?: ReactNode;
}

const NpmLink: FunctionComponent<Props> = ({ packageName, plain, children }) => {
    const link = getNpmPackageLink(packageName);

    const text = children || packageName;

    return <ExternalLink href={link}>{plain ? text : <code>{text}</code>}</ExternalLink>;
};

export default React.memo(NpmLink);
