import React, { FunctionComponent, HTMLProps } from 'react';

const ExternalLink: FunctionComponent<HTMLProps<HTMLAnchorElement>> = ({ target, rel, ...props }) => (
    <a target={target ?? '_blank'} rel={rel ?? 'noopener noreferrer'} {...props} />
);

export default ExternalLink;
