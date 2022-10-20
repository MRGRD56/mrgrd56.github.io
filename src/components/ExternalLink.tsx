import React, { FunctionComponent, HTMLProps } from 'react';
import ReactGA from 'react-ga';

const ExternalLink: FunctionComponent<HTMLProps<HTMLAnchorElement>> = ({ target, rel, href, ...props }) => (
    // @ts-ignore
    <ReactGA.OutboundLink
        eventLabel={href ?? 'unknown-external-link'}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        to={href as string}
        {...props}
    />
);

export default React.memo(ExternalLink);
