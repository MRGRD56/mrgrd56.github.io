import React, { FunctionComponent } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import PageContainer from '../components/pageHeader/PageContainer';

const RootPage: FunctionComponent = () => {
    return (
        <PageContainer wip>
            <Paragraph>
                Hello! Maybe one day I will write something here 🙂 <br />
                But you can check out other sections, look at the menu on the left!
            </Paragraph>
        </PageContainer>
    );
};

export default RootPage;
