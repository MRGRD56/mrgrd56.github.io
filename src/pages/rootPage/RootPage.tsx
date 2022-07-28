import React, { FunctionComponent } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import PageContainer, { PageTag } from '../../layouts/pages/pageContainer/PageContainer';
import { ReactComponent as ForkMeOnGitHub } from './assets/forkMeOnGitHub.svg';
import styles from './RootPage.module.scss';
import ExternalLink from '../../components/ExternalLink';
import { Col } from 'antd';
import { appRoutesList } from '../../constants/router/routes';
import Text from 'antd/lib/typography/Text';

const RootPage: FunctionComponent = () => {
    // const {isFooterHidden} = useAppSettings();

    return (
        <>
            <ExternalLink className={styles.forkMeOnGitHub} href="https://github.com/MRGRD56/mrgrd56.github.io">
                <ForkMeOnGitHub />
            </ExternalLink>

            <PageContainer tags={[PageTag.WIP]} contentClassName={styles.container}>
                <Col className={styles.contentContainer}>
                    <Paragraph>
                        Hello! Maybe one day I will write something here 🙂 <br />
                        But you can check out other sections, look at the menu on the{' '}
                        <span className="d-none d-lg-inline">left</span>
                        <span className="d-lg-none">right</span>!
                    </Paragraph>

                    <Text className={styles.helperTags}>
                        {appRoutesList.map((route) => route.title).join(', ')}
                        {', '}
                        Clock with seconds
                    </Text>
                </Col>

                {/*{isFooterHidden && (*/}
                {/*    <AppFooter className={styles.footer}/>*/}
                {/*)}*/}
            </PageContainer>
        </>
    );
};

export default RootPage;
