import React, { FunctionComponent } from 'react';
import Flex from '../../../components/flex/Flex';
import ExternalLink from '../../../components/ExternalLink';
import { isEqual, sortBy } from 'lodash';

interface Props {
    hooks: string[];
}

const getLink = (hook: string) => `https://react-hooks.org/docs/${hook}`;

const RooksHookHeading: FunctionComponent<Props> = ({ hooks }) => {
    return (
        <h3>
            <Flex row gap={8}>
                {hooks.map((hook) => (
                    <ExternalLink href={getLink(hook)}>{hook}</ExternalLink>
                ))}
            </Flex>
        </h3>
    );
};

export default React.memo(RooksHookHeading, (prev, next) => isEqual(sortBy(prev), sortBy(next)));
