import React, { FunctionComponent, HTMLProps, Ref } from 'react';
import { Link } from 'react-router-dom';

export interface RouterLinkType {
    link: string;
    isExternal?: boolean;
}

interface Props extends Omit<HTMLProps<HTMLAnchorElement>, 'href'> {
    to: RouterLinkType;
    ref?: Ref<HTMLAnchorElement>;
}

const RouterLink: FunctionComponent<Props> = ({ to, ...props }) => {
    return to.isExternal ? <a href={to.link} {...props} /> : <Link to={to.link} {...props} />;
};

export default RouterLink;
