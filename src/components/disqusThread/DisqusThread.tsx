import React, { FC, HTMLProps, useMemo, useRef } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import useAppLocation from '../../hooks/useAppLocation';
import useAppSettings from '../../hooks/useAppSettings';

type Props = HTMLProps<HTMLDivElement>;

type DiscussionEmbedConfig = DiscussionEmbed['props']['config'];

const DisqusThread: FC<Props> = ({ children, ...props }) => {
    const appRoute = useAppLocation();
    const { isCommentsBlockHidden } = useAppSettings();

    const discussionContainerRef = useRef<HTMLDivElement>(null);
    const getDiscussion: () => HTMLDivElement | undefined = () => {
        return (discussionContainerRef.current?.firstElementChild ?? undefined) as HTMLDivElement | undefined;
    };

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
        <div {...props} ref={discussionContainerRef}>
            <DiscussionEmbed shortname="mrgrd56" config={config} />
            {children}
        </div>
    );
};

export default DisqusThread;
