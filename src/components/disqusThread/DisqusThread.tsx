import React, { FC, HTMLProps, useMemo } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import useAppLocation from '../../hooks/useAppLocation';
import useAppSettings from '../../hooks/useAppSettings';

type Props = Omit<HTMLProps<HTMLDivElement>, 'id'>;

type DiscussionEmbedConfig = DiscussionEmbed['props']['config'];

const DisqusThread: FC<Props> = ({ children, ...props }) => {
    const appRoute = useAppLocation();
    const { isCommentsBlockHidden } = useAppSettings();

    const config = useMemo<DiscussionEmbedConfig>(
        () => ({
            url: new URL(appRoute?.path ?? '', window.location.origin).toString(),
            identifier: appRoute?.path,
            language: navigator.language
        }),
        [appRoute]
    );

    if (isCommentsBlockHidden) {
        return null;
    }

    return (
        <div {...props}>
            <DiscussionEmbed shortname="mrgrd56" config={config} />
            {children}
        </div>
    );
};

export default DisqusThread;
