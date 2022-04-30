import React, { FunctionComponent } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import PageContainer, { PageTag } from '../../components/pageContainer/PageContainer';
import { ReactComponent as ForkMeOnGitHub } from './assets/forkMeOnGitHub.svg';
import styles from './RootPage.module.scss';
import ExternalLink from '../../components/ExternalLink';

const RootPage: FunctionComponent = () => {
    return (
        <>
            <ExternalLink className={styles.forkMeOnGitHub} href="https://github.com/MRGRD56/mrgrd56.github.io">
                <ForkMeOnGitHub />
            </ExternalLink>

            <PageContainer tags={[PageTag.WIP]}>
                <Paragraph>
                    Hello! Maybe one day I will write something here 🙂 <br />
                    But you can check out other sections, look at the menu on the{' '}
                    <span className="d-none d-lg-inline">left</span>
                    <span className="d-lg-none">right</span>!
                </Paragraph>
            </PageContainer>
        </>
    );
};

export default RootPage;
