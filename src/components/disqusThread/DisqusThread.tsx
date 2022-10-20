import React, { FC, HTMLProps, useMemo } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import useAppLocation from '../../hooks/useAppLocation';
import useAppSettings from '../../hooks/useAppSettings';

// const initializeDisqus = (pageUrl: string, pageIdentifier: string) => {
//     (window as any).disqus_config = function (this: {page: {url: string, identifier: string}}) {
//         this.page.url = pageUrl;  // Replace PAGE_URL with your page's canonical URL variable
//         this.page.identifier = pageIdentifier; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
//     };
//
//     const script = document.createElement('script');
//     script.src = 'https://mrgrd56.disqus.com/embed.js';
//     script.setAttribute('data-timestamp', String(Number(new Date())));
//     (document.head || document.body).appendChild(script);
// };

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
